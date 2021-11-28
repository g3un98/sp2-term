import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DebugPage from '../debug/debug';

const Stack = createNativeStackNavigator();

const DebugScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DebugPage" component={DebugPage} />
    </Stack.Navigator>
  );
};

export default DebugScreen;
