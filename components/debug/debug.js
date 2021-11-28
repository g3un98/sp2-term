import * as React from 'react';
import { Button, View, ScrollView, Text } from 'react-native';
/* -------------- Import for Test && Debug ---------------- */
import { FetchCtfInfo } from '../../api/fetch';
import { DropCtfDb, InitCtfDb } from '../../database/CtfDb.js';
/* -------------------------------------------------------- */

const DebugPage = ({ navigation }) => {
  return (
    <View>
      <Text> BackEnd Debug Page </Text>
      <Button
        title="Debug start"
        onPress={() => {
          /* ----- For test && debug ----- */
          DropCtfDb();
          InitCtfDb();
          FetchCtfInfo(); 
          /* ----------------------------- */
        }} />
    </View>
  );
};

export default DebugPage;
