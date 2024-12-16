import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'myDatabase.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.log('Error opening database: ', error);
  },
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)',
      [],
      () => {
        console.log('Table created successfully');
      },
      error => {
        console.log('Error creating table: ', error);
      },
    );
  });
};

const getUsers = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Users',
      [],
      (tx, results) => {
        const users = [];
        for (let i = 0; i < results.rows.length; i++) {
          users.push(results.rows.item(i));
        }
        callback(users);
      },
      error => {
        console.log('Error retrieving users: ', error);
      },
    );
  });
};

const saveUser = (name, age) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Users (name, age) VALUES (?, ?)',
      [name, age],
      () => {
        console.log('User  saved successfully');
      },
      error => {
        console.log('Error saving user: ', error);
      },
    );
  });
};

export {createTable, saveUser, getUsers};
