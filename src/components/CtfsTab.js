import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CtfList from "../containers/CtfListContainer";
import CtfDetail from "../containers/CtfDetailContainer";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CtfList" component={CtfList} />
      <Stack.Screen name="CtfDetail" component={CtfDetail} />
    </Stack.Navigator>
  );
};
