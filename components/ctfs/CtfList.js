import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Button,
  Pressable,
  Text,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import fetch from "node-fetch";
import CtfFilter from "./CtfFilter";
import CtfCard from "./CtfCard";

export const _ctf_db = openDatabase({ name: "ctf_db" });

const _createOrgainzerTable = () => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `CREATE TABLE 'organizer' (
        'id'    INTEGER  NOT NULL  UNIQUE,
        'name'	TEXT     NOT NULL,
        PRIMARY KEY('id', 'name')
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
      `CREATE TABLE 'event' (
        'oid'             INTEGER  NOT NULL  UNIQUE,
        'onsite'          INTEGER  NOT NULL,
        'finish'          TEXT,
        'description'     TEXT,
        'weight'          REAL     NOT NULL,
        'title'           TEXT,
        'url'             TEXT,
        'is_votable_now'  INTEGER,
        'restrictions'    TEXT,
        'format'          TEXT,
        'start'           TEXT,
        'participants'    NUMERIC,
        'ctftime_url'     TEXT,
        'location'        TEXT,
        'live_feed'       TEXT,
        'public_votable'  INTEGER,
        'duration'        INTEGER  NOT NULL,
        'logo'            TEXT,
        'format_id'       INTEGER  NOT NULL,
        'id'              INTEGER  NOT NULL,
        'ctf_id'          INTEGER  NOT NULL,
        'is_marked'       INTEGER  NOT NULL,
        PRIMARY           KEY('ctf_id'),
        FOREIGN           KEY('oid')
        REFERENCES        'organizer'('id')
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
        '${organizer.name.replace(/\'/gm, "''")}'
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
          '${event.finish.replace(/\'/gm, "''")}',
          '${event.description.replace(/\'/gm, "''")}',
          ${event.weight},
          '${event.title.replace(/\'/gm, "''")}',
          '${event.url.replace(/\'/gm, "''")}',
          ${event.is_votable_now ? 1 : 0},
          '${event.restrictions.replace(/\'/gm, "''")}',
          '${event.format.replace(/\'/gm, "''")}',
          '${event.start.replace(/\'/gm, "''")}',
          ${event.participants},
          '${event.ctftime_url.replace(/\'/gm, "''")}',
          '${event.location.replace(/\'/gm, "''")}',
          '${event.live_feed.replace(/\'/gm, "''")}',
          ${event.public_votable ? 1 : 0},
          ${duration},
          '${event.logo.replace(/\'/gm, "''")}',
          ${event.format_id},
          ${event.id},
          ${event.ctf_id},
          0
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
      "SELECT * FROM event ORDER BY start",
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

const selectEvent = (id, cb) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `SELECT * FROM event WHERE id=${id}`,
      [],
      (_, res) => {
        console.log(`select event(${id}) successfully (${res.rows.length})`);
        cb(res.rows.raw());
      },
      (error) => {
        console.log(`select event(${id}) failed: ${error.message}`);
      },
    );
  });
};

const updateEvent = (id, values) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `UPDATE event SET ${values} WHERE id=${id}`,
      [],
      (_, res) => {
        console.log(`update event(${id}) successfully`);
      },
      (error) => {
        console.log(`update event(${id}) failed: ${error.message}`);
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
export const createCtfDb = () => {
  _createOrgainzerTable();
  _createEventTable();
};

// Drop "event", "organizer" tables
export const dropCtfDb = () => {
  _dropEventTable();
  _dropOrganizerTable();
};

const updateMarkedEvent = (id) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `UPDATE event SET is_marked='1' WHERE id=${id}`,
      [],
      (_, res) => {
        console.log("update marked event successfully");
      },
      (error) => {
        console.log(`update marked event failed: ${error.message}`);
      },
    );
  });
};

const fetchCtf = async () => {
  const url = "https://ctftime.org/api/v1/events/?limit=500";

  const res = await fetch(url);
  const json = await res.json();

  return json;
};

const CtfList = ({ navigation }) => {
  const [ctfs, setCtfs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    fetchCtf().then((res) =>
      res.map((ctf) => {
        insertCtfDb(ctf);
      }),
    );
    selectAllEvent(setCtfs);
  }, filters);

  return (
    <View style={styles.container}>
      {filters.length === 0 ? (
        <Pressable
          onPress={() =>
            navigation.navigate("CtfFilter", {
              filters: filters,
              setFilters: setFilters,
            })
          }
        >
          <Text style={styles.msg}>Filter</Text>
        </Pressable>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Pressable
            style={styles.filters}
            onPress={() =>
              navigation.navigate("CtfFilter", {
                filters: filters,
                setFilters: setFilters,
              })
            }
          >
            {filters.map((filter, idx) => (
              <View key={idx} style={styles.filter}>
                <Text style={styles.filterText}>{filter}</Text>
              </View>
            ))}
          </Pressable>
        </ScrollView>
      )}

      {ctfs.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          {ctfs.map((ctf) => (
            <CtfCard
              key={ctf.id}
              {...ctf}
              navigation={navigation}
              updateEvent={updateEvent}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  msg: {
    padding: 4,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  filters: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  filter: {
    marginLeft: 8,
    paddingTop: 2,
    paddingBottom: 6,
    paddingHorizontal: 8,
    backgroundColor: "royalblue",
    borderRadius: 12,
  },
  filterText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
  },
});

export default CtfList;
