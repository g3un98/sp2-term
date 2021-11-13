import * as React from 'react';
import { Button, Text, View } from 'react-native';

const CtfCard = ({ title, navigation, id }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 12 }}>
      <Text>{title}!</Text>
      <Button title='Get detail' onPress={() => navigation.navigate('CtfDetail', { id: id })} />
    </View>
  );
};

export default CtfCard;
