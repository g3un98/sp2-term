import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CtfCard from "../containers/CtfCardContainer";

export default ({ ctfs, actions, navigation }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    (async () => {
      await actions.createDb();
      await actions.fetchCtf("20");
      await actions.selectCtf();
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search ctfs"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
        />
        <Ionicons name="search" size={24} color="gray" />
      </View>
      {ctfs.length == 0 ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          {ctfs.map((ctf) => {
            if(ctf.title.indexOf(text) != -1) {
              return (<CtfCard key={ctf.id} {...ctf} navigation={navigation} />)
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
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    marginHorizontal: 6,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 45,
  },
  searchInput: {
    flex: 1,
  },
});
