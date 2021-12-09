import * as React from "react";
import { Button, ScrollView, Text, View, StyleSheet } from "react-native";

const CtfFilter = ({ route }) => {
  const { filters, setFilters } = route.params;

  const click = () => {
    setFilters(...filters, "A");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Button title="text" onPress={() => click} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CtfFilter;
