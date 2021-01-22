import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import Journal  from '../pages/Journal/index';
import Book from '../pages/Book/index';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

const commonOpts = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTinTColor: '#505050'
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator 
      initialRouteName="Journal"
      drawerType="slide"
      screenOptions={commonOpts}
      drawerStyle={{
        width: '60%',
      }}
      // drawerContent={DrawerContent}
    >
      <Drawer.Screen name="Journal" getComponent={()=> Journal} options={{title: '期刊'}}/>
      <Drawer.Screen name="Book" getComponent={()=>Book} options={{title: '书籍'}}/>
    </Drawer.Navigator>
  );
}