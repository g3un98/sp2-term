import * as React from 'react';
import { useEffect, useState } from "react";
import { openDatabase } from 'react-native-sqlite-storage';
console.reportErrorsAsExceptions = false;

const db = openDatabase({
  name: "ctf_event",
});

const example = [ {"organizers": [{"id": 104940, "name": "ACISO"}]}, {"organizers": [{"id": 30003, "name": "SPbCTF"}]} ];

const TestDb = (command, json_) => {

  const createTables = () => {
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
  }

  const addOrganizers = () => { 
    json_.map(org => {
      console.log(org.organizers[0]);
      db.transaction(txn => {
        txn.executeSql(
          'INSERT INTO organizers VALUES ('
          + org.organizers[0].id
          + ', '
          + '"' + org.organizers[0].name + '")',
          [],
          (sqlTxn, res) => {
            console.log('organizers insert successfully');
          },
          error => {
            console.log('error on insertion organizers ' + error.message);
          },
        );
      });
    })
    
  };
  
  if(command == 'test') {
    console.log('command: '+ command);
  }
  else if(command == 'createTables') {
    createTables();
  }
  else if(command == 'addOrganizers') {
    console.log('command: '+ command);
    addOrganizers();
  }
  else {
    console.log('Non-command: ' + command);
    return 1;
  };
};

export default TestDb;