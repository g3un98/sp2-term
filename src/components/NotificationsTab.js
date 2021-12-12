import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationList from "../containers/NotificationListContainer";
import NotificationDetail from "../containers/NotificationDetailContainer";

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
    </Stack.Navigator>
  );
};
