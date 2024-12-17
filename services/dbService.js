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

const getUserById = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user_table WHERE userid = ?',
      [id],
      (tx, results) => {
        if (results.rows.length > 0) {
          const user = results.rows.item(0);
          callback(user);
        } else {
          callback(null);
        }
      },
      error => {
        console.log('Error retrieving user: ', error);
        callback(null);
      },
    );
  });
};

const updateCheckoutTime = (id, callback) => {
  const checkoutTime = new Date().toISOString();

  db.transaction(tx => {
    tx.executeSql(
      'UPDATE user_table SET checkout = ?, isSynced = ? WHERE userid = ?',
      [checkoutTime, false, id],
      () => {
        console.log(
          'Checkout time updated successfully and isSynced set to false',
        );
        callback(true);
      },
      error => {
        console.log('Error updating checkout time: ', error);
        callback(false);
      },
    );
  });
};

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS user_table (usrid INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, checkin TEXT, checkout TEXT, isSynced BOOLEAN DEFAULT FALSE)',
      [],
      () => {
        console.log('User  table created successfully');
      },
      error => {
        console.log('Error creating user table: ', error);
      },
    );

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS mastertable (emplyeid INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT, transaction_data TEXT)',
      [],
      () => {
        console.log('Master table created successfully');
      },
      error => {
        console.log('Error creating master table: ', error);
      },
    );
  });
};
const getUsers = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM user_table',
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

const addIsSyncedColumn = () => {
  db.transaction(tx => {
    tx.executeSql(
      'ALTER TABLE user_table ADD COLUMN isSynced BOOLEAN',
      [],
      () => {
        console.log('isSynced column added successfully');
      },
      error => {
        console.log('Error adding isSynced column: ', error);
      },
    );
  });
};

const saveUser = (userid, onSuccess) => {
  const checkin = new Date().toISOString();
  const checkout = null;
  const isSynced = false;

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO user_table (userid, checkin, checkout, isSynced) VALUES (?, ?, ?, ?)',
      [userid, checkin, checkout, isSynced],
      () => {
        console.log('User  saved successfully');
        if (onSuccess) {
          onSuccess();
        }
      },
      error => {
        console.log('Error saving user: ', error);
      },
    );
  });
};

const getMasterData = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM mastertable',
      [],
      (tx, results) => {
        const masterData = [];
        for (let i = 0; i < results.rows.length; i++) {
          masterData.push(results.rows.item(i));
        }
        callback(masterData);
      },
      error => {
        console.log('Error retrieving master data: ', error);
      },
    );
  });
};

const updateUserSyncStatus = (currentStatus, newStatus, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE user_table SET isSynced = ? WHERE isSynced = ?',
      [newStatus, currentStatus],
      () => {
        console.log('User sync status updated successfully');
        callback(true);
      },
      error => {
        console.log('Error updating user sync status: ', error);
        callback(false);
      },
    );
  });
};

export {
  createTable,
  saveUser,
  getUsers,
  getMasterData,
  getUserById,
  updateCheckoutTime,
  addIsSyncedColumn,
  updateUserSyncStatus,
};
