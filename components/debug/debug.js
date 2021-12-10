import React, { useState } from "react";
import { Button, View, ScrollView, Text } from "react-native";
import fetch from "node-fetch";
import { createCtfDb, dropCtfDb } from "../ctfs/CtfList";

const DebugPage = ({ navigation }) => {
  const [color, setColor] = useState("Blue");

  return (
    <View>
      <Text>BackEnd Debug Page</Text>
      <Button
        title="Debug start"
        onPress={async () => {
          dropCtfDb();
          createCtfDb();
        }}
      />
      <Button
        title={color}
        onPress={() => {
          setColor(color === "Blue" ? "Red" : "Blue");
        }}
      />
    </View>
  );
};

export default DebugPage;
