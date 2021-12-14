import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchList from "../containers/SearchListContainer";
import CtfDetail from "../containers/CtfDetailContainer";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchList" component={SearchList} />
      <Stack.Screen name="CtfDetail" component={CtfDetail} />
    </Stack.Navigator>
  );
};
