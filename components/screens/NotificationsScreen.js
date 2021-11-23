import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NotificationList from '../notifications/NotificationList';
import NotificationDetail from '../notifications/NotificationDetail';

const Stack = createNativeStackNavigator();

const NotificationsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetail} />
    </Stack.Navigator>
  );
};

export default NotificationsScreen;
