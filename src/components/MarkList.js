import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import CtfCard from "../containers/CtfCardContainer";

export default ({ ctfs, actions }) => {
  return (
    <View style={styles.container}>
      {ctfs.length == 0 ? (
        <Text style={styles.msg}>즐겨찾기된 CTF가 없습니다</Text>
      ) : (
        <ScrollView>
          {ctfs.map((ctf) => {
            if (ctf.is_marked) {
              return <CtfCard key={ctf.id} {...ctf} />;
            }
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  msg: {
    marginTop: 32,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
});
