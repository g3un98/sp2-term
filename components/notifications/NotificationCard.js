import * as React from 'react';
import { Button, Text, View } from 'react-native';

const NotificationCard = ({ title, navigation, id }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
      }}
    >
      <Text>{title}!</Text>
      <Button
        title="Get detail"
        onPress={() => navigation.navigate('NotificationDetail', { id: id })}
      />
    </View>
  );
};

export default NotificationCard;
