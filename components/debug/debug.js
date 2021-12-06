import React, { useState } from "react";
import { Button, View, ScrollView, Text } from "react-native";
import fetch from "node-fetch";

const DebugPage = ({ navigation }) => {
  const [color, setColor] = useState("Blue");

  return (
    <View>
      <Text>BackEnd Debug Page</Text>
      <Button
        title="Debug start"
        onPress={async () => {
          const res = await fetch(
            "https://ctftime.org/api/v1/events/?limit=10",
          );
          const json = await res.json();
          console.log(json);
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
