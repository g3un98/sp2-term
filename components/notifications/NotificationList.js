import * as React from 'react';
import {ScrollView} from 'react-native';
import NotificationCard from './NotificationCard';

const notificaions = [
  {
    id: 123,
    title: 'Notification test1',
  },
  {
    id: 124,
    title: 'Notification test2',
  },
  {
    id: 125,
    title: 'Notification test3',
  },
  {
    id: 126,
    title: 'Notification test4',
  },
];

const NotificationList = ({navigation}) => {
  return (
    <ScrollView>
      {notificaions.map(notificaion => (
        <NotificationCard
          key={notificaion.id}
          {...notificaion}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default NotificationList;
