/* TODO
  1. 문자열 포맷팅 이용해서 organizers와 event insert문 만들기
  2. select문 이용해서 화면에 뿌리는 함수 만들기
*/
import * as React from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

String.prototype.format = function() {
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace("{" + arg + "}", arguments[arg]);
    }
    return formatted;
};

const db = openDatabase({
  name: "ctf_event",
});

const CtfDb = () => {
  console.log('CtfDb online!');
  let sql;

  db.transaction(txn => {
    sql = `
    CREATE TABLE "organizers" (
      "id"	INTEGER NOT NULL UNIQUE,
      "name"	TEXT NOT NULL,
      PRIMARY KEY("id","name")
    )`;
    txn.executeSql(sql, [],
      (sqlTxn, res) => {
        console.log('table "organizers" created successfully');
      },
      error => {
        console.log('error on creat table ' + error.message);
      }
    );
  });
  db.transaction(txn => {
    sql = `
    CREATE TABLE "event" (
      "oid"	INTEGER NOT NULL UNIQUE,
      "onsite"	INTEGER NOT NULL,
      "finish"	TEXT,
      "description"	TEXT,
      "weight"	REAL NOT NULL,
      "title"	TEXT,
      "url"	TEXT,
      "is_votable_now"	INTEGER,
      "restrictions"	TEXT,
      "format"	TEXT,
      "start"	TEXT,
      "participants"	NUMERIC,
      "ctftime_url"	TEXT,
      "location"	TEXT,
      "live_feed"	TEXT,
      "public_votable"	INTEGER,
      "duration"	INTEGER NOT NULL,
      "logo"	TEXT,
      "format_id"	INTEGER NOT NULL,
      "id"	INTEGER NOT NULL,
      "ctf_id"	INTEGER NOT NULL,
      PRIMARY KEY("ctf_id"),
      FOREIGN KEY("oid") REFERENCES "organizers"
    )`;
    txn.executeSql(sql, [],
      (sqlTxn, res) => {
        console.log('table "event" created successfully');
      },
      error => {
        console.log('error on creat table ' + error.message);
      }
    );
  });
}

const CtfDbInsert = (args) => {
  console.log('CtfDbInsert online!');
  let sql;
  args.map(argv => {
    db.transaction(txn => {
      sql = `
      INSERT INTO organizers VALUES(
        {0},
        "{1}"
      )`.format(argv.organizers[0].id, argv.organizers[0].name);
      console.log(sql)
      txn.executeSql(sql, [],
        (sqlTxn, res) => {
          console.log('data "organizers" inserted successfully');
        },
        error => {
          console.log('error on insert table ' + error.message);
        }
      );
    });
  });
}
/*
INSERT INTO organizers VALUES(
	12345,
	"4ose"
)
*/

export {
  CtfDb, CtfDbInsert,
}