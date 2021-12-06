import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import fetch from "node-fetch";
import CtfCard from "./CtfCard";

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

const _insertOrganizer = (organizer) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `INSERT INTO organizer VALUES(
        ${organizer.id},
        "${organizer.name.replace(/"/g, '\\"')}"
      )`,
      [],
      (_, res) => {
        console.log("insert organizer successfully");
      },
      (error) => {
        console.log(`insert organizer failed: ${error.message}`);
      },
    );
  });
};

const _insertEvent = (event) => {
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
        console.log("insert event successfully");
      },
      (error) => {
        console.log(`insert event failed: ${error.message}`);
      },
    );
  });
};

const selectAllOrganizer = (cb) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM organizer",
      [],
      (_, res) => {
        console.log(`select all orgainzer successfully (${res.rows.length})`);
        cb(res.rows.raw());
      },
      (error) => {
        console.log(`select all organizer failed: ${error.message}`);
      },
    );
  });
};

const selectAllEvent = (cb) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM event",
      [],
      (_, res) => {
        console.log(`select all event successfully (${res.rows.length})`);
        cb(res.rows.raw());
      },
      (error) => {
        console.log(`select all event failed: ${error.message}`);
      },
    );
  });
};

const deleteOrganizer = (id) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM organizer WHERE id=${id}`,
      [],
      (_, res) => {
        console.log(`delete organizer(${id}) successfully`);
      },
      (error) => {
        console.log(`delete organizer(${id}) failed: ${error.message}`);
      },
    );
  });
};

const deleteEvent = (id) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `DELETE FROM event WHERE id=${id}`,
      [],
      (_, res) => {
        console.log(`delete event(${id}) successfully`);
      },
      (error) => {
        console.log(`delete event(${id}) failed: ${error.message}`);
      },
    );
  });
};

// Inseart ctf infomation into "event", "organizer" tables
const insertCtfDb = (ctf) => {
  ctf.organizers.map((organizer) => {
    _insertOrganizer(organizer);
  });
  _insertEvent(ctf);
};

// Create "event", "organizer" tables
const createCtfDb = () => {
  _createOrgainzerTable();
  _createEventTable();
};

// Drop "event", "organizer" tables
const dropCtfDb = () => {
  _dropEventTable();
  _dropOrganizerTable();
};

const fetchCtf = async () => {
  const url = "https://ctftime.org/api/v1/events/?limit=500";

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

const CtfList = ({ navigation }) => {
  const [ctfs, setCtfs] = useState([]);

  useEffect(() => {
    (async () => {})();
    fetchCtf().then((res) =>
      res.map((ctf) => {
        insertCtfDb(ctf);
      }),
    );
    selectAllEvent(setCtfs);
  }, []);

  return (
    <ScrollView containerStyle={styles.container}>
      {ctfs.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        ctfs.map((ctf) => (
          <CtfCard key={ctf.id} {...ctf} navigation={navigation} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CtfList;
