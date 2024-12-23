import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'myDatabase.db',
    location: 'default',
  },
  () => {},
  error => {},
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
        callback(null);
      },
    );
  });
};

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS user_table (usrid INTEGER PRIMARY KEY AUTOINCREMENT, userid TEXT, operation TEXT, timing TEXT, isSynced BOOLEAN DEFAULT FALSE)',
      [],
      () => {},
      error => {},
    );

    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS mastertable (id INTEGER PRIMARY KEY AUTOINCREMENT, masterId INTEGER UNIQUE, employeeId INTEGER, employeename TEXT, fingerPrintData TEXT, lastTransactionDate DATETIME)',
      [],
      () => {},
      error => {},
    );
  });
};

const createLogsTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, employeeid TEXT, operation TEXT, response TEXT, message TEXT, timing TEXT)',
      [],
      () => {
        console.log('Logs table created successfully.');
      },
      error => {
        console.error('Error creating logs table: ', error);
      },
    );
  });
};

const getLogs = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM logs ORDER BY timing DESC', // Fetch logs ordered by timing
      [],
      (tx, results) => {
        const logs = [];
        for (let i = 0; i < results.rows.length; i++) {
          logs.push(results.rows.item(i));
        }
        callback(logs); // Return the logs to the callback
      },
      error => {
        console.error('Error fetching logs: ', error);
        callback([]); // Return an empty array on error
      },
    );
  });
};

const logOperation = (employeeId, operation, response, message, timing) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO logs (employeeid, operation, response, message, timing) VALUES (?, ?, ?, ?, ?)',
      [employeeId, operation, response, message, timing],
      () => {
        console.log('Log saved successfully.');
      },
      error => {
        console.error('Error saving log: ', error);
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
      error => {},
    );
  });
};

const addIsSyncedColumn = () => {
  db.transaction(tx => {
    tx.executeSql(
      'ALTER TABLE user_table ADD COLUMN isSynced BOOLEAN',
      [],
      () => {},
      error => {},
    );
  });
};

const saveUser = (userid, operation, timing, onSuccess, onError) => {
  console.log(timing, 'Saved Timing in DB');
  const isSynced = false;

  db.transaction(tx => {
    tx.executeSql(
      'SELECT COUNT(*) as count FROM mastertable WHERE employeeId = ?',
      [userid],
      (tx, results) => {
        const count = results.rows.item(0).count;

        if (count === 0) {
          if (onError) {
            onError('Employee not found in the database');
          }
        } else {
          tx.executeSql(
            'INSERT INTO user_table (userid, operation, timing, isSynced) VALUES (?, ?, ?, ?)',
            [userid, operation, timing, isSynced],
            () => {
              if (onSuccess) {
                onSuccess();
              }
            },
            error => {},
          );
        }
      },
      error => {},
    );
  });
};

const getLatestOperation = (userId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT operation FROM user_table WHERE userid = ? ORDER BY timing DESC LIMIT 1',
      [userId],
      (tx, results) => {
        if (results.rows.length > 0) {
          const latestOperation = results.rows.item(0).operation;
          callback(latestOperation);
        } else {
          callback(null); // No records found
        }
      },
      error => {
        console.error('Error fetching latest operation:', error);
        // Log the error in the logs table
        const timing = new Date().toISOString();
        logOperation(
          userId,
          'fetch_latest_operation',
          'not success',
          error.message,
          timing,
        );
        callback(null); // Handle error case
      },
    );
  });
};
const updateUserSyncStatus = (userId, newStatus, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE user_table SET isSynced = ? WHERE userid = ?',
      [newStatus, userId],
      () => {
        console.log(
          `User ${userId} sync status updated successfully to ${newStatus}.`,
        );
        callback(true);
      },
      error => {
        console.error('Error updating user sync status: ', error);
        callback(false);
      },
    );
  });
};

const getMasterData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM mastertable',
        [],
        (tx, results) => {
          const data = [];
          for (let i = 0; i < results.rows.length; i++) {
            data.push(results.rows.item(i));
          }
          resolve(data); // Resolve with the fetched data
        },
        (tx, error) => {
          reject(error); // Reject on error
        },
      );
    });
  });
};
const fetchAndSaveMasterData = async () => {
  try {
    const response = await fetch(
      'http://156.67.111.32:3020/api/Employee/master',
    );

    // Check if the response is OK (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Start a database transaction
    db.transaction(tx => {
      data.forEach(item => {
        const {
          masterId,
          employeeId,
          employeename,
          fingerPrintData,
          lastTransactionDate,
        } = item;

        // Check if the record already exists
        tx.executeSql(
          'SELECT COUNT(*) as count FROM mastertable WHERE masterId = ?',
          [masterId],
          (tx, results) => {
            const count = results.rows.item(0).count;

            // If the record does not exist, insert it
            if (count === 0) {
              tx.executeSql(
                'INSERT INTO mastertable (masterId, employeeId, employeename, fingerPrintData, lastTransactionDate) VALUES (?, ?, ?, ?, ?)',
                [
                  masterId,
                  employeeId,
                  employeename,
                  fingerPrintData,
                  lastTransactionDate,
                ],
                () => {
                  // console.log(`Inserted masterId: ${masterId}`); // Log successful insertion
                },
                error => {
                  console.error('Error inserting data:', error); // Log insertion error
                },
              );
            } else {
              // console.log(
              //   `masterId: ${masterId} already exists. Skipping insert.`,
              // ); // Log if record exists
            }
          },
          error => {
            console.error('Error checking existing record:', error); // Log error checking existing record
          },
        );
      });
    });
  } catch (error) {
    console.error('Error fetching and saving master data:', error); // Log any fetch errors
  }
};

export {
  createTable,
  saveUser,
  getUsers,
  getMasterData,
  getUserById,
  addIsSyncedColumn,
  updateUserSyncStatus,
  fetchAndSaveMasterData,
  getLatestOperation,
  createLogsTable,
  getLogs,
  logOperation,
};
