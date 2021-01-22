import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import Journal from '../pages/Journal/index';
import { JournalOpts } from '../pages/Journal/config/JournalOpts';

const Stack = createStackNavigator();

//公用头部样式设置
const CommonOptions = {
  headerStatusBarHeight: 14,
  headerTintColor: '#505050',
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS
};


export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={CommonOptions}>
      <Stack.Screen 
        name="Journal"
        options={JournalOpts}
        getComponent={()=> Journal} 
      />
    </Stack.Navigator>
  );
}