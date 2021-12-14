import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
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
      <TextInput
        style={{height: 40}}
        placeholder="Search ctfs"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
      {ctfs ? (
        <ScrollView>
        {ctfs.map((ctf) => {
          if(ctf.title.indexOf(text) != -1) {
            return (<CtfCard key={ctf.id} {...ctf} navigation={navigation} />)
          }
        })}
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
