import * as React from "react";
import { openDatabase } from "react-native-sqlite-storage";

const _ctf_db = openDatabase({ name: "ctf_db" });

const _createOrgainzerTable = () => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE "organizer" (
        "id"    INTEGER  NOT NULL  UNIQUE,
        "name"	TEXT     NOT NULL,
        PRIMARY KEY("id", "name")
      )`,
      [],
      (_, res) => {
        console.log("create organizer table successfully");
      },
      (error) => {
        console.log(`create organizer table failed: ${error.message}`);
      },
    );
  });
}

const _createEventTable = () => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE "event" (
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
        FOREIGN           KEY("oid")
        REFERENCES        "organizer"("id")
      )`,
      [],
      (_, res) => {
        console.log("create event table successfully");
      },
      (error) => {
        console.log(`create event table failed: ${error.message}`);
      },
    );
  });
}

const _dropEventTable = () => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE event",
      [],
      (_, res) => {
        console.log("drop event table successfully");
      },
      (error) => {
        console.log(`drop event table failed: ${error.message}`);
      },
    );
  });
}

const _dropOrganiverTable = () => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "DROP TABLE organizer",
      [],
      (_, res) => {
        console.log("drop organizer table successfully");
      },
      (error) => {
        console.log(`drop organizer table failed: ${error.message}`);
      },
    );
  });
}

const _insertOrganizerTable = (organizers) => {
  organizers.map((organizer) => {
    _ctf_db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO organizer VALUES(
          ${organizer.id},
          "${organizer.name.replaceall('\"', '\\\"')}"
        )`,
        [],
        (_, res) => {
          console.log("insert organizer data successfully");
        },
        (error) => {
          console.log(`insert organizer data failed: ${error.message}`);
        },
      );
    });
  });
}

const _insertEventTable = (event) => {
    let duration = 0;
    duration += Number(event.duration.hours);
    duration += Number(event.duration.days) * 12;

    _ctf_db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO event VALUES(
          ${event.organizers[0].id},
          ${event.onsite ? 1 : 0},
          "${event.finish.replaceall('\"', '\\\"')}",
          "${event.description.replaceall('\"', '\\\"')}",
          ${event.weight},
          "${event.title.replaceall('\"', '\\\"')}",
          "${event.url.replaceall('\"', '\\\"')}",
          ${event.is_votable_now ? 1 : 0},
          "${event.restrictions.replaceall('\"', '\\\"')}",
          "${event.format.replaceall('\"', '\\\"')}",
          "${event.start.replaceall('\"', '\\\"')}",
          ${event.participants},
          "${event.ctftime_url.replaceall('\"', '\\\"')}",
          "${event.location.replaceall('\"', '\\\"')}",
          "${event.live_feed.replaceall('\"', '\\\"')}",
          ${event.public_votable ? 1 : 0},
          ${duration},
          "${event.logo.replaceall('\"', '\\\"')}",
          ${event.format_id},
          ${event.id},
          ${event.ctf_id}
        )`,
        [],
        (_, res) => {
          console.log("insert event data successfully");
        },
        (error) => {
          console.log(`insert event data failed: ${error.message}`);
        },
      );
    });
}

// Inseart data into "event", "organizer" tables
export const insertCtfDb = (ctf_array) => {
  ctf_array.map((ctf) => {
    _insertOrganizerTable(ctf.organizers);
    _insertEventTable(ctf);
  });
};

// Create "event", "organizer" tables
export const createCtfDb = () => {
  _createOrgainzerTable();
  _createEventTable();
};

// Drop "event", "organizer" tables
export const dropCtfDb = () => {
  _dropEventTable();
  _dropOrganiverTable();
};
