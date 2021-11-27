import * as React from 'react';
import {Text, View} from 'react-native';

const NotificationDetail = ({route}) => {
  const {id} = route.params;
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{id}!</Text>
    </View>
  );
};

export default NotificationDetail;
