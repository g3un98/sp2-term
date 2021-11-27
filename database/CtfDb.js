import * as React from 'react';
import { openDatabase } from 'react-native-sqlite-storage';

const _ctf_db = openDatabase({ name: "ctf_event" });

// Drop "event", "organizer" tables
export const DropCtfDb = () => {
  _ctf_db.transaction((txn) => {
    sql = `DROP TABLE event`;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log(`[DropCtfDb] drop event table successfully`);
      },
      (error) => {
        console.log(`[DropCtfDb] drop event table failed: ${error.message}`);
      },
    );
  });
  _ctf_db.transaction((txn) => {
    sql = `DROP TABLE organizer`;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log(`[DropCtfDb] drop organizer table successfully`);
      },
      (error) => {
        console.log(`[DropCtfDb] drop organizer table failed: ${error.message}`);
      },
    );
  });
};

// Create "event", "organizer" tables
export const InitCtfDb = () => {
  let sql;

  _ctf_db.transaction((txn) => {
    sql = `
      CREATE TABLE "organizer" (
        "id"    INTEGER  NOT NULL  UNIQUE,
        "name"	TEXT     NOT NULL,
        PRIMARY KEY("id","name")
      )
    `;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log(`[InitCtfDb] create organizer table successfully`);
      },
      (error) => {
        console.log(`[InitCtfDb] create organizer table failed: ${error.message}`);
      },
    );
  });
  _ctf_db.transaction((txn) => {
    sql = `
      CREATE TABLE "event" (
        "oid"             INTEGER  NOT NULL  UNIQUE,
        "onsite"          INTEGER  NOT NULL,
        "finish"          TEXT,
        "description"     TEXT,
        "weight"          REAL     NOT NULL,
        "title"           TEXT,
        "url"             TEXT,
        "is_votable_now"  INTEGER,
        "restrictions"    TEXT,
        "format"          TEXT,
        "start"           TEXT,
        "participants"    NUMERIC,
        "ctftime_url"     TEXT,
        "location"        TEXT,
        "live_feed"       TEXT,
        "public_votable"  INTEGER,
        "duration"        INTEGER  NOT NULL,
        "logo"            TEXT,
        "format_id"       INTEGER  NOT NULL,
        "id"              INTEGER  NOT NULL,
        "ctf_id"          INTEGER  NOT NULL,
        PRIMARY           KEY("ctf_id"),
        FOREIGN           KEY("oid") REFERENCES "organizer"("id")
      )
    `;
    txn.executeSql(
      sql,
      [],
      (sqlTxn, res) => {
        console.log(`[InitCtfDb] create event table successfully`);
      },
      (error) => {
        console.log(`[InitCtfDb] create event table failed: ${error.message}`);
      },
    );
  });
};

// Inseart data into "event", "organizer" tables
export const InsertCtfDb = (ctf_array) => {
  let sql;

  ctf_array.map((ctf) => {
    _ctf_db.transaction((txn) => {
      sql = `
        INSERT INTO organizer VALUES(
          ${ctf.organizers[0].id},
          "${ctf.organizers[0].name}"
        )
      `;
      txn.executeSql(
        sql,
        [],
        (sqlTxn, res) => {
          console.log(`[InsertCtfDb] insert organizer data successfully`);
        },
        (error) => {
          console.log(`[InsertCtfDb] insert organizer data failed: ${error.message}`);
        },
      );
    });

    const onsite = ctf.onsite ? 1 : 0;
    const is_votable_now = ctf.is_votable_now ? 1 : 0;
    const public_votable = ctf.public_votable ? 1 : 0;
    let duration = 0;
    duration += Number(ctf.duration.hours);
    duration += Number(ctf.duration.days) * 12;

    _ctf_db.transaction((txn) => {
      // oid, onsite, "finish", "description", weight,
      // "title", "url", is_votable_now, "restrictions", "format"
      // "start", participants, "ctftime_url", "location", "live_feed"
      // public_votable, duration, "logo", format_id, id
      // ctf_id
      sql = `
        INSERT INTO event VALUES(
          ${ctf.organizers[0].id},
          ${onsite},
          "${ctf.finish}",
          "${ctf.description}",
          ${ctf.weight},
          "${ctf.title}",
          "${ctf.url}",
          ${is_votable_now},
          "${ctf.restrictions}",
          "${ctf.format}",
          "${ctf.start}",
          ${ctf.participants},
          "${ctf.ctftime_url}",
          "${ctf.location}",
          "${ctf.live_feed}",
          ${public_votable},
          ${duration},
          "${ctf.logo}",
          ${ctf.format_id},
          ${ctf.id},
          ${ctf.ctf_id}
        )
      `;
      txn.executeSql(
        sql,
        [],
        (sqlTxn, res) => {
          console.log(`[InsertCtfDb] insert event data successfully`);
        },
        (error) => {
          console.log(`[InsertCtfDb] insert event data failed: ${error.message}`);
        },
      );
    });
  });
};
