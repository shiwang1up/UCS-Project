import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {getLogs} from '../services/dbService';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActivityIndicator} from 'react-native';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';
const LogsPage = ({navigation}) => {
  const [logs, setLogs] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsSyncing(true);
        getLogs(data => {
          setLogs(data);
          setIsSyncing(false);
        });
      } catch (error) {
        console.error('Error fetching logs:', error);
        setIsSyncing(false);
      }
    };

    fetchLogs();
  }, []);

  const formatDate = isoString => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderItem = ({item}) => {
    const borderColor = item.response === 'success' ? 'green' : 'red';
    return (
      <View style={[dynamicCard, {borderLeftColor: borderColor}]}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.message}</Text>
          <Text style={styles.subtitle}>{item.response}</Text>
          <Text style={styles.description}>Employee ID: {item.employeeid}</Text>
          <Text style={styles.date}>{formatDate(item.timing)}</Text>
        </View>
      </View>
    );
  };

  const dynamicCard = {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 6,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.topButtonsContainer, {backgroundColor: 'white'}]}>
        <TouchableOpacity
          style={styles.topButtonBack}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={35} color={'#00b4d8'} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={[styles.titleText]}>Logs</Text>
        </View>
        <View style={styles.topButtonForward}>{/** */}</View>
      </View>
      {isSyncing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00b4d8" />
          <Text style={styles.loadingText}>Loading Logs...</Text>
        </View>
      )}

      <FlatList
        data={logs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    color: '#00b4d8',
    fontSize: 56,
    fontWeight: '500',
  },
  topButtonBack: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom: 10,
  },
  topButtonsContainer: {
    width: '100%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
  },

  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#00b4d8',
    fontSize: 16,
  },
  list: {
    padding: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: '#0077b6',
    marginTop: 5,
  },
});

export default LogsPage;
