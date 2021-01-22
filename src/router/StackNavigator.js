import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import BookDetail from '../pages/BookDetail/index';
import { BookDetailStackOpts } from '../pages/BookDetail/config/BookDetailOpts';

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
    <Stack.Navigator screenOptions={CommonOptions} >
      <Stack.Screen 
        name="Drawer"
        options={{headerShown:false}}
        getComponent={()=> DrawerNavigator} 
      />
      <Stack.Screen 
        name="BookDetail"
        options={BookDetailStackOpts}
        getComponent={()=>BookDetail}
      />
    </Stack.Navigator>
  );
}