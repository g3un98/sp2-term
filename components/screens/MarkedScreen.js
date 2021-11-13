import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarkedCtfList from '../marked/MarkedCtfList';
import MarkedCtfDetail from '../marked/MarkedCtfDetail';

const Stack = createNativeStackNavigator();

const MarkedScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='MarkedCtfList' component={MarkedCtfList} />
      <Stack.Screen name='MarkedCtfDetail' component={MarkedCtfDetail} />
    </Stack.Navigator>
  );
};

export default MarkedScreen;
