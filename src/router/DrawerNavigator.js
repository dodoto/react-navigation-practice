import React from 'react';
import { StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Journal  from '../pages/Journal/index';
import Book from '../pages/Book/index';
import TopTab from './TopNavigator';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

const commonOpts = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTinTColor: '#505050'
}

export default function DrawerNavigator() {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <Drawer.Navigator 
        backBehavior="none"
        initialRouteName="TVandMovie"
        drawerType="slide"
        screenOptions={commonOpts}
        drawerStyle={{
          width: '60%',
        }}
        // drawerContent={DrawerContent}
      >
        <Drawer.Screen name="TVandMovie" getComponent={()=>TopTab} options={{
          title:'FIX字幕侠',
          headerTintColor:'#fff',
          headerPressColorAndroid: '#fff',
          headerStyle: {
            backgroundColor: '#1f1f1f',
            elevation: 0
          }
        }} />
        <Drawer.Screen name="Journal" getComponent={()=> Journal} options={{title: '期刊'}}/>
        <Drawer.Screen name="Book" getComponent={()=> Book} options={{title:'书籍'}}/>
      </Drawer.Navigator>
    </>
  );
}