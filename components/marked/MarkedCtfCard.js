import * as React from "react";
import { Button, Text, View } from "react-native";

// const MarkedCtfCard = ({ title, navigation, id, markedCtfs, deleteMarkedCtfs }) => {
const MarkedCtfCard = (props) => {
  const deleteMarkedCtfList = (id) => {props.deleteMarkedCtfList(id)};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
      }}
    >
      <Text>{props.title}!</Text>
      <Button
        title="Get detail"
        onPress={() =>
          props.navigation.navigate("MarkedCtfDetail", { id: props.id })
        }
      />
      <Button
        title="Delete"
        onPress={() => {
          deleteMarkedCtfList(props.id);
        }}
      />
    </View>
  );
};

export default MarkedCtfCard;
