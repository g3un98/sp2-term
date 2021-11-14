import * as React from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
  name: "ctf_event",
})

const TestDb = (name) => {
  db.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS organizers ('
      + 'id INTEGER NOT NULL UNIQUE,'
      + 'name TEXT NOT NULL,'
      + 'PRIMARY KEY(id, name) )',
      [],
      (sqlTxn, res) => {
        console.log('table created successfully');
      },
      error => {
        console.log('error on creation table ' + error.message);
      },
    );
  });

  if(name = 'test') {
    console.log({name});
  }

  const addEvent = () => {

  }

  console.log('success');
};

export default TestDb;