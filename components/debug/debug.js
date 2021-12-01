import React, { useState } from "react";
import { Button, View, ScrollView, Text } from "react-native";
/* -------------- Import for Test && Debug ---------------- */
import { fetchCtfInfo } from "../../api/fetch";
import { dropCtfDb, createCtfDb } from "../../database/CtfDb";
/* -------------------------------------------------------- */

const DebugPage = ({ navigation }) => {
  const [color, setColor] = useState("Blue");
  const onClickChange = () => {
    let selectColor;
    selectColor = color === "Blue" ? "Red" : "Blue";
    setColor(selectColor);
  };

  return (
    <View>
      <Text> BackEnd Debug Page </Text>
      <Button
        title="Debug start"
        onPress={async () => {
          let fetch = await fetchCtfInfo();
        }}
      />
      <Button
        title={color}
        onPress={() => {
          onClickChange();
        }}
      />
    </View>
  );
};

export default DebugPage;
