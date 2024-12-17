import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {
  createTable,
  getUsers,
  getMasterData,
  updateUserSyncStatus,
} from '../services/dbService';
import Icon from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const UserScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isSyncingMaster, setIsSyncingMaster] = useState(false);
  const [isSyncingUser, setIsSyncingUser] = useState(false);

  useEffect(() => {
    createTable();

    getUsers(fetchedUsers => {
      setUsers(fetchedUsers);
    });

    getMasterData(fetchedMasterData => {
      setMasterData(fetchedMasterData);
    });
  }, []);

  const handleSyncUser = () => {
    setIsSyncingUser(true);

    updateUserSyncStatus(false, true, success => {
      if (success) {
        console.log('User  sync status updated successfully');
        getUsers(fetchedUsers => {
          setUsers(fetchedUsers);
        });
      } else {
        console.log('Failed to update user sync status');
      }
      setTimeout(() => {
        setIsSyncingUser(false);
      }, 3000);
    });
  };
  const handleSyncMaster = () => {
    setIsSyncingMaster(true);
    setTimeout(() => {
      setIsSyncingMaster(false);
    }, 3000);
  };

  const renderUserItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.userid}</Text>
      <Text style={styles.tableCell}>{item.checkin}</Text>
      <Text style={styles.tableCell}>{item.checkout}</Text>
      <Text style={styles.tableCell}>{item.isSynced ? 'Yes' : 'No'}</Text>
    </View>
  );

  const renderMasterItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.emplyeid}</Text>
      <Text style={styles.tableCell}>{item.token}</Text>
      <Text style={styles.tableCell}>{item.transaction_data}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.topButtonBack}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={35} color={'#00b4d8'} />
          </TouchableOpacity>

          <Text style={styles.titleText}>Offline Records</Text>

          <View>
            {/* <Icon name="arrow-forward" size={35} color={'white'} /> */}
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.titleWrapper}>
            <Text style={styles.header}>User List</Text>
            <TouchableOpacity style={{padding: 8}} onPress={handleSyncUser}>
              <Icon name="sync" size={30} />
            </TouchableOpacity>
            {isSyncingUser && (
              <View style={styles.syncPopup}>
                <Text style={styles.syncText}>Syncing User Data...</Text>
              </View>
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>UserID</Text>
              <Text style={styles.tableHeaderCell}>Checkin</Text>
              <Text style={styles.tableHeaderCell}>Checkout</Text>
              <Text style={styles.tableHeaderCell}>Is Synced</Text>
            </View>
            <FlatList
              data={users}
              renderItem={renderUserItem}
              keyExtractor={item => item.usrid.toString()}
            />
          </View>
          <View style={styles.titleWrapper}>
            <Text style={styles.header}>Master Data List</Text>
            <TouchableOpacity style={{padding: 8}} onPress={handleSyncMaster}>
              <Icon name="sync" size={30} />
            </TouchableOpacity>
            {isSyncingMaster && (
              <View style={styles.syncPopup}>
                <Text style={styles.syncText}>Syncing Master Data...</Text>
              </View>
            )}
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Employee ID</Text>
              <Text style={styles.tableHeaderCell}>Token</Text>
              <Text style={styles.tableHeaderCell}>Transaction Data</Text>
            </View>
            <FlatList
              data={masterData}
              renderItem={renderMasterItem}
              keyExtractor={item => item.emplyeid.toString()}
            />
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  syncPopup: {
    position: 'absolute',
    right: '0%',
    top: 45,
    transform: [{translateX: 0}],
    backgroundColor: '#00b4d8',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  syncText: {
    color: 'white',
    textAlign: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  mainContent: {
    marginTop: 100,
    padding: 20,
  },
  topButtonsContainer: {
    position: 'absolute',
    width: '100%',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    padding: 20,
    backgroundColor: 'white',
  },
  titleText: {
    color: '#00b4d8',
    fontSize: 36,
  },
  topButtonForward: {
    backgroundColor: '#00b4d8',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#00b4d8',
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
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
});

export default UserScreen;
