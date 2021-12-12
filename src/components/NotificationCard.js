import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default () => {
  return (
    <View style={styles.container}>
      <Text>NotificationCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
