import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";
import CtfCard from "../containers/CtfCardContainer";

export default ({ ctfs, actions, navigation }) => {
  useEffect(() => {
    (async () => {
      await actions.createDb();
      await actions.fetchCtf("20");
      await actions.selectCtf();
    })();
  }, []);

  return (
    <View style={styles.container}>
      {ctfs ? (
        <ScrollView>
          {ctfs.map((ctf) => (
            <CtfCard key={ctf.id} {...ctf} navigation={navigation} />
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
