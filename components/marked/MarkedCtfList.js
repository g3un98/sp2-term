import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, ScrollView, StyleSheet } from "react-native";
import MarkedCtfCard from "./MarkedCtfCard";
import fetch from "node-fetch";

const MarkedCtfList = ({ navigation }) => {
  const [markedCtfs, setMarkedCtfs] = useState([]);

  const fetchCtf = async () => {
    const url = "https://ctftime.org/api/v1/events/?limit=10";
    const res = await fetch(url);
    const json = await res.json();
    setMarkedCtfs(json);
  };

  useEffect(() => {
    fetchCtf();
  }, []);

  const deleteMarkedCtf = (id) => {
    setMarkedCtfs(markedCtfs.filter((ctf) => ctf.id != id));
  };

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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MarkedCtfList;
