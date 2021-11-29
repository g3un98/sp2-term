import * as React from 'react';
import { Button, View, ScrollView, Text } from 'react-native';
/* -------------- Import for Test && Debug ---------------- */
import { fetchCtfInfo } from '../../api/fetch';
import { dropCtfDb, createCtfDb } from '../../database/CtfDb';
/* -------------------------------------------------------- */

const DebugPage = ({ navigation }) => {
  return (
    <View>
      <Text> BackEnd Debug Page </Text>
      <Button
        title="Debug start"
        onPress={() => {
          /* ----- For test && debug ----- */
          dropCtfDb();
          createCtfDb();
          fetchCtfInfo(); 
          /* ----------------------------- */
        }} />
    </View>
  );
};

export default DebugPage;
