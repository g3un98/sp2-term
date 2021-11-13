import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CtfsScreen from './components/CtfsScreen';
import MarkedScreen from './components/MarkedScreen';
import SearchScreen from './components/SearchScreen';
import SettingsScreen from './components/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Ctfs') {
              iconName = focused ? 'flag' : 'flag-outline';
            } else if (route.name === 'Marked') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor: 'gray',
        })}>
        <tab.screen name="Ctfs" component={CtfsScreen} />
        <tab.screen name="Marked" component={MarkedScreen} />
        <tab.screen name="Search" component={SearchScreen} />
        <tab.screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
