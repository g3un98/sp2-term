import React from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import RNCalendarEvents from "react-native-calendar-events";

export default ({ route }) => {
  const {
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
  } = route.params;

  const checkPermission = async () => {
    let permission = await RNCalendarEvents.checkPermissions();

    if (permission !== "restricted" && permission !== "authorized") {
      permission = await RNCalendarEvents.requestPermissions();
    }

    return permission;
  };

  const addEvent = async () => {
    permission = await checkPermission();

    if (permission === "restricted" || permission === "authorized") {
      await RNCalendarEvents.saveEvent(title, {
        startDate: new Date(start).toISOString(),
        endDate: new Date(finish).toISOString(),
        url: url ? url : ctftime_url,
        location: onsite ? location : "Online",
      });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logo} />
        ) : (
          <Image />
        )}
        <Text style={styles.title}>{title}</Text>
        <Pressable onPress={addEvent}>
          <Text style={styles.date}>
            {new Date(start).toTimeString()} ~ {new Date(finish).toTimeString()}
          </Text>
        </Pressable>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  date: {
    marginVertical: 8,
  },
  description: {
    marginTop: 12,
    fontSize: 18,
    textAlign: "left",
  },
});
