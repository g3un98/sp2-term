import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CtfList from '../ctfs/CtfList';
import CtfDetail from '../ctfs/CtfDetail';

const Stack = createNativeStackNavigator();

const CtfsScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='CtfList' component={CtfList} />
      <Stack.Screen name='CtfDetail' component={CtfDetail} />
    </Stack.Navigator>
  );
};

export default CtfsScreen;
