import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default ({
  id,
  is_marked,
  title,
  start,
  finish,
  description,
  logo,
  url,
  ctftime_url,
  location,
  onsite,
  navigation,
  actions,
}) => {
  const [isMark, setIsMark] = useState(is_marked);

  const toggleCtf = (id) => {
    actions.toggleCtf(id, isMark);
    setIsMark(!isMark);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.info}
        onPress={() =>
          navigation.navigate("CtfDetail", {
            id,
            title,
            start,
            finish,
            description,
            logo,
            url,
            ctftime_url,
            onsite,
            location,
          })
        }
      >
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.date}>
          {new Date(start).toDateString()} ~ {new Date(finish).toDateString()}
        </Text>
      </Pressable>
      <Pressable style={styles.mark} onPress={() => toggleCtf(id)}>
        <Ionicons
          name={isMark ? "bookmark" : "bookmark-outline"}
          size={24}
          color={isMark ? "tomato" : "gray"}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  info: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  date: {
    marginTop: 8,
  },
  mark: {
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});
