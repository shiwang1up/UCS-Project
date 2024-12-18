






import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  createTable,
  getUsers,
  getMasterData,
  updateUserSyncStatus,
  fetchAndSaveMasterData,
} from '../services/dbService';
import Icon from 'react-native-vector-icons/Ionicons';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';

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

    getUsers(fetchedUsers => {
      // Prepare payload for syncing
      const payload = fetchedUsers
        .map(user => {
          if (!user.isSynced) {
            return {
              userId: user.userid,
              operation: user.operation, // 0 for checkout, 1 for checkin
              timing: user.timing, // Assuming this is the timestamp for checkin/checkout
              fingerPrintData: 'abcd', // Replace with actual fingerprint data if available
            };
          }
          return null; // Exclude already synced users
        })
        .filter(Boolean); // Remove null values

      console.log(payload, 'Payload is this:');

      if (payload.length === 0) {
        console.log('No users to sync. Request list cannot be empty.');
        setIsSyncingUser(false);
        return;
      }

      fetch('http://156.67.111.32:3020/api/User/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Response data:', data);
          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item.status === 'Success') {
                updateUserSyncStatus(item.userId, true, success => {
                  if (!success) {
                    console.log(
                      `Failed to update user ${item.userId} sync status.`,
                    );
                  }
                });
              } else if (item.status === 'Error') {
                console.log(`Error for user ${item.userId}: ${item.message}`);
                updateUserSyncStatus(item.userId, true, success => {
                  if (!success) {
                    console.log(
                      `Failed to update user ${item.userId} sync status.`,
                    );
                  }
                });
              }
            });
          }
        })
        .then(() => {
          getUsers(updatedUsers => {
            setUsers(updatedUsers);
          });
        })
        .catch(error => {
          console.log('Error during user sync: ', error);
        })
        .finally(() => {
          setIsSyncingUser(false);
        });
    });
  };
  const handleSyncMaster = () => {
    setIsSyncingMaster(true);

    fetchAndSaveMasterData()
      .then(() => {
        getMasterData(fetchedMasterData => {
          setMasterData(fetchedMasterData);
        });
      })
      .catch(error => {
        console.error('Error during master data sync: ', error);
      })
      .finally(() => {
        setIsSyncingMaster(false);
      });
  };



  
  const renderUserItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.userid}</Text>
      <Text style={styles.tableCell}>{item.operation}</Text>
      <Text style={styles.tableCell}>{item.timing}</Text>
      <Text style={styles.tableCell}>{item.isSynced ? 'Yes' : 'No'}</Text>
    </View>
  );

  const renderMasterItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.masterId}</Text>
      <Text style={styles.tableCell}>{item.userId}</Text>
      <Text style={styles.tableCell}>{item.username}</Text>
      <Text style={styles.tableCell}>{item.fingerPrintData}</Text>
      <Text style={styles.tableCell}>{item.lastTransactionDate}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        {(isSyncingUser || isSyncingMaster) && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#00b4d8" />
            <Text style={styles.loadingText}>Syncing Data...</Text>
          </View>
        )}
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
        <ScrollView style={styles.mainContent}>
          {/* Loading State */}

          <View style={styles.titleWrapper}>
            <Text style={styles.header}>User List</Text>
            <TouchableOpacity style={{padding: 8}} onPress={handleSyncUser}>
              <Icon name="sync" size={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>User ID</Text>
              <Text style={styles.tableHeaderCell}>Operation</Text>
              <Text style={styles.tableHeaderCell}>Timing</Text>
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
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Master ID</Text>
              <Text style={styles.tableHeaderCell}>User ID</Text>
              <Text style={styles.tableHeaderCell}>Username</Text>
              <Text style={styles.tableHeaderCell}>Fingerprint Data</Text>
              <Text style={styles.tableHeaderCell}>Last Transaction Date</Text>
            </View>
            <FlatList
              data={masterData}
              renderItem={renderMasterItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // top: -20,
    // left: -20,
    // right: -20,
    // bottom: -20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: '#00b4d8',
    fontSize: 16,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
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
