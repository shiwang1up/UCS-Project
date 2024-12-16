import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {createTable, saveUser, getUsers} from '../services/dbService';

const UserScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    createTable();
    saveUser('Employee 1', 30);

    getUsers(fetchedUsers => {
      setUsers(fetchedUsers);
    });
  }, []);

  const renderItem = ({item}) => (
    <View>
      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
    </View>
  );

  return (
    <View>
      <Text>User List</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default UserScreen;
