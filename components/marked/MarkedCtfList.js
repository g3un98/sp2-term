import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import MarkedCtfCard from "./MarkedCtfCard";
import fetch from "node-fetch";
import { _ctf_db } from "../ctfs/CtfList";

const selectAllMarkedEvent = (cb) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      "SELECT * FROM event WHERE is_marked='1'",
      [],
      (_, res) => {
        console.log(
          `select all marked event successfully (${res.rows.length})`,
        );
        let newArray = res.rows.raw();
        cb(newArray);
        console.log(`markedCtfs IN: ${markedCtfs}`);
      },
      (error) => {
        console.log(`select all marked event failed: ${error.message}`);
      },
    );
  });
};

const updateMarkedEvent = (id) => {
  _ctf_db.transaction((txn) => {
    txn.executeSql(
      `UPDATE event SET is_marked='0' WHERE id=${id}`,
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

const MarkedCtfList = ({ navigation }) => {
  const [markedCtfs, setMarkedCtfs] = useState([]);

  const deleteMarkedCtf = (id) => {
    updateMarkedEvent(id);
    setMarkedCtfs(markedCtfs.filter((ctf) => ctf.id != id));
  };

  const refreshMarkedCtf = () => {
    selectAllMarkedEvent(setMarkedCtfs);
    console.log(`markedCtfs: ${markedCtfs}`);
  }

  useEffect(() => {
    refreshMarkedCtf();
    console.log("Check");
  }, []);

  return (
    <ScrollView containerStyle={styles.container}>
      {markedCtfs.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        markedCtfs.map((ctf) => (
          <MarkedCtfCard
            key={ctf.id}
            {...ctf}
            deleteMarkedCtf={deleteMarkedCtf}
            navigation={navigation}
          />
        ))
      )}
      <Button title="Refresh" onPress={refreshMarkedCtf}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MarkedCtfList;
