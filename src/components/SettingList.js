import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default () => {
  return (
    <View style={styles.container}>
      <Text>SettingList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
