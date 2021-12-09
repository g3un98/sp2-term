import * as React from "react";
import { Text, View } from "react-native";

const CtfDetail = ({ route }) => {
  const { id } = route.params;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{id}!</Text>
      /*
      <Pressable
        style={styles.btn}
        onPress={async () => await Share.share({ message: ctftime_url })}
      >
        <Ionicons name="share-outline" size={24} color="tomato" />
      </Pressable>
      */
    </View>
  );
};

export default CtfDetail;
