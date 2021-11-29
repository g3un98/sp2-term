import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CtfsScreen from './components/screens/CtfsScreen';
import MarkedScreen from './components/screens/MarkedScreen';
import NotificationsScreen from './components/screens/NotificationsScreen';
import SettingsScreen from './components/screens/SettingsScreen';

/* -------------- Import for Test && Debug ---------------- */
import DebugScreen from './components/screens/DebugScreen';
/* -------------------------------------------------------- */

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Ctfs') {
              iconName = focused ? 'flag' : 'flag-outline';
            } else if (route.name === 'Marked') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Debug') {
              iconName = focused ? 'checkcircle' : 'checkcircleo';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Ctfs"
          component={CtfsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Marked"
          component={MarkedScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ headerShown: false, tabBarBadge: 4 }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Debug"
          component={DebugScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
