import * as React from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

String.prototype.format = function () {
  var formatted = this;
  for (var arg in arguments) {
    formatted = formatted.replace("{" + arg + "}", arguments[arg]);
  }
  return formatted;
};

const db = openDatabase({
  name: "ctf_event",
});

const CtfDbDrop = () => {
  db.transaction((txn) => {
    sql = `
    DROP TABLE event`;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log('event table drop successfully');
      },
      (error) => {
        console.log('error on drop table ' + error.message);
      },
    );
  });
  db.transaction((txn) => {
    sql = `
    DROP TABLE organizers`;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log('organizers table drop successfully');
      },
      (error) => {
        console.log('error on drop table ' + error.message);
      },
    );
  });
};

const CtfDb = () => {
  console.log('CtfDb online!');
  let sql;

  db.transaction((txn) => {
    sql = `
    CREATE TABLE "organizers" (
      "id"	INTEGER NOT NULL UNIQUE,
      "name"	TEXT NOT NULL,
      PRIMARY KEY("id","name")
    )`;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log('table "organizers" created successfully');
      },
      (error) => {
        console.log('error on creat table ' + error.message);
      },
    );
  });
  db.transaction((txn) => {
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
      FOREIGN KEY("oid") REFERENCES "organizers"("id")
    )`;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log('table "event" created successfully');
      },
      (error) => {
        console.log('error on creat table ' + error.message);
      },
    );
  });
};

const CtfDbInsert = (args) => {
  console.log('CtfDbInsert online!');
  let sql;
  args.map((argv) => {
    db.transaction((txn) => {
      sql = `
      INSERT INTO organizers VALUES(
        {0},
        "{1}"
      )`.format(argv.organizers[0].id, argv.organizers[0].name);
      console.log(sql);
      txn.executeSql(
        sql,
        [],
        (sqlTxn, res) => {
          console.log('data "organizers" inserted successfully');
        },
        (error) => {
          console.log('error on insert table ' + error.message);
        },
      );
    });

    var onsite,
      duration = 0,
      is_votable_now,
      public_votable;
    if (argv.onsite == false) {
      onsite = 0;
    } else if (argv.onsite == true) {
      onsite = 1;
    }
    if (argv.is_votable_now == false) {
      is_votable_now = 0;
    } else if (argv.is_votable_now == true) {
      is_votable_now = 1;
    }
    if (argv.public_votable == false) {
      public_votable = 0;
    } else if (argv.public_votable == true) {
      public_votable = 1;
    }
    duration += Number(argv.duration.hours);
    duration += Number(argv.duration.days) * 12;

    db.transaction((txn) => {
      // oid, onsite, "finish", "description", weight,
      // "title", "url", is_votable_now, "restrictions", "format"
      // "start", participants, "ctftime_url", "location", "live_feed"
      // public_votable, duration, "logo", format_id, id
      // ctf_id
      sql = `
      INSERT INTO event VALUES(
        {0}, {1}, "{2}", "{3}", {4},
        "{5}", "{6}", {7}, "{8}", "{9}",
        "{10}", {11}, "{12}", "{13}", "{14}",
        {15}, {16}, "{17}", {18}, {19},
        {20}
      )`.format(
        argv.organizers[0].id,
        onsite,
        argv.finish,
        argv.description,
        argv.weight,
        argv.title,
        argv.url,
        is_votable_now,
        argv.restrictions,
        argv.format,
        argv.start,
        argv.participants,
        argv.ctftime_url,
        argv.location,
        argv.live_feed,
        public_votable,
        duration,
        argv.logo,
        argv.format_id,
        argv.id,
        argv.ctf_id,
      );
      console.log(sql);
      txn.executeSql(
        sql,
        [],
        (sqlTxn, res) => {
          console.log('data "event" inserted successfully');
        },
        (error) => {
          console.log('error on insert table ' + error.message);
        },
      );
    });
  });
};
/*
INSERT INTO organizers VALUES(
	12345,
	"4ose"
)
*/
/*
INSERT INTO event VALUES(
	123,
	false,
	"2021-11-15T16:00:00+00:00",
	"The CTF competition hosted by Intent. The Security Research Summit.\r\nFor researchers. By researchers.",
	0.00,
	"Intent CTF 2021",
	"https://ctf.intentsummit.org/",
	false,
	"Open",
	"Jeopardy",
	"2021-11-13T16:00:00+00:00",
	37,
	"https://ctftime.org/event/1454/",
	"",
	"https://ctftime.org/live/1454/",
	true,
	48,
	"https://ctftime.org//media/events/intent_i.png",
	1,
	1454,
	672
)
*/

export { CtfDb, CtfDbInsert, CtfDbDrop };
