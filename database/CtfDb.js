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
};

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
};

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
};

const _dropOrganizerTable = () => {
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
};

const _insertOrganizerTable = (organizers) => {
  organizers.map((organizer) => {
    _ctf_db.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO organizer VALUES(
          ${organizer.id},
          "${organizer.name.replace(/"/g, '\\"')}"
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
};

const _insertEventTable = (event) => {
  let duration = 0;
  duration += Number(event.duration.hours);
  duration += Number(event.duration.days) * 12;

  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO event VALUES(
          ${event.organizers[0].id},
          ${event.onsite ? 1 : 0},
          "${event.finish.replace(/"/g, '\\"')}",
          "${event.description.replace(/"/g, '\\"')}",
          ${event.weight},
          "${event.title.replace(/"/g, '\\"')}",
          "${event.url.replace(/"/g, '\\"')}",
          ${event.is_votable_now ? 1 : 0},
          "${event.restrictions.replace(/"/g, '\\"')}",
          "${event.format.replace(/"/g, '\\"')}",
          "${event.start.replace(/"/g, '\\"')}",
          ${event.participants},
          "${event.ctftime_url.replace(/"/g, '\\"')}",
          "${event.location.replace(/"/g, '\\"')}",
          "${event.live_feed.replace(/"/g, '\\"')}",
          ${event.public_votable ? 1 : 0},
          ${duration},
          "${event.logo.replace(/"/g, '\\"')}",
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
};

const _selectOrganizerTable = () => {
  let results = [];

  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM organizer",
      [],
      (_, res) => {
        console.log("select organizer table successfully");
        let len = res.rows.length;

        if(len > 0) {
          for(let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push(item);
          }
        }
      },
      (error) => {
        console.log(`select organizer table failed: ${error.message}`);
      },
    );
  });
  return results;
};

const _selectEventTable = () => {
  let results = [];
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM event",
      [],
      (_, res) => {
        console.log("select event table successfully");
        let len = res.rows.length;

        if(len > 0) {
          for(let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            results.push(item);
          }
        }
      },
      (error) => {
        console.log(`select event table failed: ${error.message}`);
      },
    );
  });
  return results;
};

const _deleteOrganizerTable = (oid) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM organizer WHERE id=${oid}`,
      [],
      (_, res) => {
        console.log("delete organizer table successfully");
      },
      (error) => {
        console.log(`delete organizer table failed: ${error.message}`);
      },
    );
  });
};

const _deleteEventTable = (oid) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM event WHERE id=${oid}`,
      [],
      (_, res) => {
        console.log("delete event table successfully");
      },
      (error) => {
        console.log(`delete event table failed: ${error.message}`);
      },
    );
  });
};

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
  _dropOrganizerTable();
};

// Select "event", "organizer" tables
export const selectCtfDb = () => {
  return _selectEventTable();
  
};

// Delete "event", "organizer" tables
export const deleteCtfDb = () => {
  _deleteEventTable();
  _deleteOrganizerTable();
};