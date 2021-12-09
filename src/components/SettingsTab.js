import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingList from "./SettingList";
import SettingDetail from "./SettingDetail";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingList" component={SettingList} />
      <Stack.Screen name="SettingDetail" component={SettingDetail} />
    </Stack.Navigator>
  );
};
