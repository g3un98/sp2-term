import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingList from '../settings/SettingList';

const Stack = createNativeStackNavigator();

const NotificationsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='SettingList' component={SettingList} />
    </Stack.Navigator>
  );
};

export default NotificationsScreen;
