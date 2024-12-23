import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SectionList,
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
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/AntDesign';

const UserScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [isSyncingUser, setIsSyncingUser] = useState(false);
  const [newData, setNewData] = useState([]);

  const [isUserTableExpanded, setIsUserTableExpanded] = useState(false);
  const [isMasterTableExpanded, setIsMasterTableExpanded] = useState(false);
  const [isNewDataTableExpanded, setIsNewDataTableExpanded] = useState(false);

  const displayedUsers = isUserTableExpanded ? users : users.slice(0, 10);
  const displayedMasterData = isMasterTableExpanded
    ? masterData
    : masterData.slice(0, 10);
  const displayedNewData = isNewDataTableExpanded
    ? newData
    : newData.slice(0, 10);

  useEffect(() => {
    const loadData = async () => {
      createTable();

      getUsers(fetchedUsers => {
        const sortedUsers = fetchedUsers.sort((a, b) => {
          return new Date(b.timing) - new Date(a.timing);
        });
        setUsers(sortedUsers);
      });

      try {
        const fetchingMasterData = await getMasterData();
        setMasterData(fetchingMasterData);
      } catch (error) {
        console.error('Error fetching master data:', error);
      }

      fetchNewData();
    };

    loadData();
  }, []);
  const fetchNewData = () => {
    fetch('http://156.67.111.32:3020/api/Employee/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Sort the data based on lastTransactionDate in descending order
        const sortedData = data.sort((a, b) => {
          return new Date(b.opDateTime) - new Date(a.opDateTime);
        });
        setNewData(sortedData); // Update the new data state with sorted data
      })
      .catch(error => {
        console.error('Error fetching new data:', error);
      });
  };

  const formatDate = isoString => {
    const date = new Date(isoString);

    // Get the components of the date
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const formattedDate = date.toLocaleString('en-US', options);

    // Extract the date parts
    const [month, day, year, time] = formattedDate.split(/, | /);

    // Add the suffix for the day
    const suffix =
      day.endsWith('1') && day !== '11'
        ? 'st'
        : day.endsWith('2') && day !== '12'
        ? 'nd'
        : day.endsWith('3') && day !== '13'
        ? 'rd'
        : 'th';

    return `${month} ${day}${suffix}, ${year} at ${time}`;
  };
  const handleSyncUser = () => {
    handleSyncMaster();
    setIsSyncingUser(true);
    getUsers(fetchedUsers => {
      const payload = fetchedUsers
        .map(user => {
          if (!user.isSynced) {
            return {
              employeeId: user.userid,
              op: user.operation,
              opDateTime: user.timing,
              fingerPrintData: 'abcd',
            };
          }
          return null;
        })
        .filter(Boolean);

      console.log(payload, 'Payload is this for handleSync:User ');

      if (payload.length === 0) {
        console.log('No users to sync. Request list cannot be empty.');
        setIsSyncingUser(false);
        return;
      }

      fetch('http://156.67.111.32:3020/api/Employee', {
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
          if (Array.isArray(data)) {
            data.forEach(item => {
              if (item.status === 'Success') {
                updateUserSyncStatus(item.employeeId, true, success => {
                  if (!success) {
                    // console.log(
                    //   `Failed to update user ${item.userId} sync status.`,
                    // );
                  }
                });
              } else if (item.status === 'Error') {
                // console.log(
                //   `Error for user ${item.employeeId}: ${item.status}`,
                // );
                updateUserSyncStatus(item.employeeId, true, success => {
                  if (!success) {
                  }
                });
              }
            });
          }
        })
        .then(() => {
          getUsers(updatedUsers => {
            const sortedUpdatedUsers = updatedUsers.sort((a, b) => {
              return new Date(b.timing) - new Date(a.timing);
            });
            setUsers(sortedUpdatedUsers);
          });
        })
        .then(() => {
          fetchNewData();
        })
        .catch(error => {})
        .finally(() => {
          setIsSyncingUser(false);
        });
    });
  };
  const handleSyncMaster = () => {
    setIsSyncingUser(true);

    fetchAndSaveMasterData()
      .then(async () => {
        try {
          const fetchingMasterData = await getMasterData();

          if (fetchingMasterData && fetchingMasterData.length > 0) {
            setMasterData(fetchingMasterData);
          } else {
          }
        } catch (error) {
          console.error('Error fetching master data:', error);
        }
      })
      .catch(error => {
        console.error('Error during master data sync: ', error);
      })
      .finally(() => {
        setIsSyncingUser(false);
      });
  };

  const sections = [
    {
      title: 'Offline Employee Data( Checkin / Checkout )',
      data: [{isHeader: true}, ...displayedUsers],
    },
    {
      title: 'Master Data List',
      data: [{isHeader: true}, ...displayedMasterData],
    },
    {
      title: 'Synced Server Data List',
      data: [{isHeader: true}, ...displayedNewData],
    },
  ];

  const renderNewTableHeader = () => (
    <View style={[styles.tableHeader, styles.newTableHeader]}>
      <Text style={styles.tableHeaderCell}>Employee ID</Text>
      <Text style={styles.tableHeaderCell}>Operation</Text>
      <Text style={styles.tableHeaderCell}>Operation Time</Text>
      <Text style={styles.tableHeaderCell}>Employee Name</Text>
      <Text style={styles.tableHeaderCell}>Last Transaction Date</Text>
      {/* Add more headers as needed */}
    </View>
  );

  const renderExpandButton = (isExpanded, setExpanded) => (
    <View style={styles.expandView}>
      <TouchableOpacity
        style={styles.expandButton}
        onPress={() => setExpanded(!isExpanded)}>
        <Icon name={isExpanded ? 'remove' : 'add'} size={30} color="#00b4d8" />
        <Text style={styles.expandButtonText}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({item, section}) => {
    if (item.isHeader) {
      return section.title === 'Offline Employee Data( Checkin / Checkout )'
        ? renderUserTableHeader()
        : section.title === 'Master Data List'
        ? renderMasterTableHeader()
        : renderNewTableHeader(); // Render new table header
    }

    if (section.title === 'Offline Employee Data( Checkin / Checkout )') {
      return (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.userid}</Text>
          <Text style={styles.tableCell}>
            {item.operation === '1'
              ? 'Check in'
              : item.operation === '0'
              ? 'Check out'
              : 'Unknown'}
          </Text>
          <Text style={styles.tableCell}>{formatDate(item.timing)}</Text>
          <View style={styles.tableCell}>
            {item.isSynced ? (
              <Icon3 name="checksquare" size={22} color="green" />
            ) : (
              <Icon2 name="squared-cross" size={24} color="red" />
            )}
          </View>
        </View>
      );
    } else if (section.title === 'Master Data List') {
      return (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{item.masterId}</Text>
          <Text style={styles.tableCell}>{item.employeeId}</Text>
          <Text style={styles.tableCell}>{item.employeename}</Text>
          <Text style={styles.tableCell}>{item.fingerPrintData}</Text>
          <Text style={styles.tableCell}>
            {formatDate(item.lastTransactionDate)}
          </Text>
        </View>
      );
    } else if (section.title === 'Synced Server Data List') {
      return (
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>{`100${item.masterId}`}</Text>
          <Text style={styles.tableCell}>{item.operationType}</Text>
          <Text style={styles.tableCell}>{formatDate(item.opDateTime)}</Text>
          <Text style={styles.tableCell}>{item.employeename}</Text>
          <Text style={styles.tableCell}>
            {formatDate(item.lastTransactionDate)}
          </Text>
        </View>
      );
    }
    return null;
  };
  const renderSectionFooter = ({section}) => {
    if (section.data.length > 1) {
      // Check if there are items in the section
      if (section.title === 'Offline Employee Data( Checkin / Checkout )') {
        return renderExpandButton(isUserTableExpanded, setIsUserTableExpanded);
      } else if (section.title === 'Master Data List') {
        return renderExpandButton(
          isMasterTableExpanded,
          setIsMasterTableExpanded,
        );
      } else if (section.title === 'Synced Server Data List') {
        return renderExpandButton(
          isNewDataTableExpanded,
          setIsNewDataTableExpanded,
        );
      }
    }
    return null;
  };
  const renderUserTableHeader = () => (
    <View style={[styles.tableHeader, styles.userTableHeader]}>
      <Text style={styles.tableHeaderCell}>Employee ID</Text>
      <Text style={styles.tableHeaderCell}>Operation</Text>
      <Text style={styles.tableHeaderCell}>Timing</Text>
      <Text style={styles.tableHeaderCell}>Is Synced</Text>
    </View>
  );

  const renderMasterTableHeader = () => (
    <View style={[styles.tableHeader, styles.masterTableHeader]}>
      <Text style={styles.tableHeaderCell}>Master ID</Text>
      <Text style={styles.tableHeaderCell}>Employee ID</Text>
      <Text style={styles.tableHeaderCell}>Employee Name</Text>
      <Text style={styles.tableHeaderCell}>Fingerprint Data</Text>
      <Text style={styles.tableHeaderCell}>Last Transaction Date</Text>
    </View>
  );
  const renderSectionHeader = ({section: {title}}) => (
    <Text style={styles.header}>{title}</Text>
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
          <View>{/* <Text></Text> */}</View>
        </View>

        {isSyncingUser && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#00b4d8" />
            <Text style={styles.loadingText}>Syncing Data...</Text>
          </View>
        )}
        <SafeAreaView style={styles.mainContent}>
          <View>
            <SectionList
              style={{
                borderRadius: 10,
                marginTop: 10,
                marginHorizontal: 5,
                paddingHorizontal: 20,
                backgroundColor: 'white',
                position: 'relative',
              }}
              sections={sections}
              keyExtractor={(item, index) => {
                if (item.isHeader) {
                  return `header-${index}`;
                }
                return item.userid
                  ? `${item.userid}-${index}` // Combine userid with index
                  : `${item.masterId}-${index}`; // Combine masterId with index
              }}
              renderItem={renderItem}
              renderSectionHeader={renderSectionHeader}
              renderSectionFooter={renderSectionFooter} // Add this line to render the footer
              ListHeaderComponent={
                <View
                  style={{
                    padding: 8,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}>
                  {/* <Icon name="sync" size={30} />
                   */}
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => handleSyncUser()}>
                    <Text style={[styles.buttonText]}>Sync</Text>
                    <Icon name="sync" size={22} color="white" />
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  expandView: {
    padding: 10,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  expandButton: {
    width: '10%',
    paddingVertical: 2,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  expandButtonText: {
    marginLeft: 5,
    color: '#00b4d8',
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Aligns items vertically centered
    backgroundColor: '#00b4d8',
    paddingHorizontal: 15,
    paddingVertical: 7,
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    color: 'white',
  },
  userTableHeader: {
    backgroundColor: '#d1e7dd', // Light green for user table header
  },
  masterTableHeader: {
    backgroundColor: '#cfe2ff', // Light blue for master data table header
  },
  newTableHeader: {
    backgroundColor: '#ffeeba', // Light yellow for synced server data table header
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    marginTop: 110,
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
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    // marginBottom: 20,
    // padding:10,
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
