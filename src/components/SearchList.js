import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import CtfCard from "../containers/CtfCardContainer";

export default () => {
  return (
    <View style={styles.container}>
      <Text>"해줘"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
