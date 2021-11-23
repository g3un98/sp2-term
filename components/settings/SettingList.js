import * as React from 'react';
import {ScrollView, Text} from 'react-native';

const settings = [
  {
    title: 'filter',
  },
  {
    title: 'ctftime account',
  },
  {
    title: 'dreamhack account',
  },
  {
    title: 'blah blah',
  },
];

const SettingList = ({navigation}) => {
  return (
    <ScrollView>
      {settings.map(setting => (
        <Text key={setting.title}>{setting.title}</Text>
      ))}
    </ScrollView>
  );
};

export default SettingList;
