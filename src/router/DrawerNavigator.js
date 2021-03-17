import React from 'react';
import { Text, TouchableNativeFeedback, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Journal  from '../pages/Journal/index';
import Book from '../pages/Book/index';
import TopTab from './TopNavigator';
import Novels from '../pages/Novels/index';
import DrawerContent from './components/DrawerContent';
import DrawerRightBtn from './components/DrawerRightBtn';

import { TestContext } from '../context/TestContext';

const Drawer = createDrawerNavigator();

const commonOpts = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTinTColor: '#505050',
}

export default function DrawerNavigator({navigation}) {

  return (
    <TestContext.Provider value={{navigation}}>
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
          headerRight: DrawerRightBtn,
          headerPressColorAndroid: '#fff',
          headerStyle: {
            backgroundColor: '#1f1f1f',
            elevation: 0
          }
        }} />
        <Drawer.Screen name="Journal" getComponent={()=> Journal} options={{title: '期刊'}}/>
        <Drawer.Screen name="Book" getComponent={()=> Book} options={{title:'书籍'}}/>
        <Drawer.Screen name="Novels" getComponent={()=>Novels} options={{title:'小说'}}/>
      </Drawer.Navigator>
    </TestContext.Provider>
  );
}