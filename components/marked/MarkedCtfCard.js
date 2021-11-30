import * as React from "react";
import { Button, Text, View } from "react-native";

// const MarkedCtfCard = ({ title, navigation, id, markedCtfs, deleteMarkedCtfs }) => {
const MarkedCtfCard = (props) => {
  const deleteMarkedCtf = (id) => {
    /*
    let tmpMarkedCtfs = markedCtfs;
    const deleteIndex = tmpMarkedCtfs.findIndex(function(item) {
      return item.id === id;
    });

    console.log("Delete ID: " + tmpMarkedCtfs[deleteIndex].id);
    tmpMarkedCtfs.splice(deleteIndex, 1);
    // database delete function add
    deleteMarkedCtfs(tmpMarkedCtfs);
    */
    props.deleteMarkedCtfs(id);
  }

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
        onPress={() => props.navigation.navigate("MarkedCtfDetail", { id: props.id })}
      />
      <Button
        title="Delete"
        onPress={() => {
          deleteMarkedCtf(props.id); 
        }}
      />
    </View>
  );
};

export default MarkedCtfCard;
