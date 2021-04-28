import React, { useCallback, useRef } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Journal  from '../pages/Journal/index';
import Book from '../pages/Book/index';
import TopTab from './TopNavigator';
import Novels from '../pages/Novels/index';
import DrawerContent from './components/DrawerContent';
import DrawerRightBtn from './components/DrawerRightBtn';

import { TestContext } from '../context/TestContext';
import { useFocusEffect } from '@react-navigation/core';
import { BackHandler, ToastAndroid } from 'react-native';


const Drawer = createDrawerNavigator();

const commonOpts = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTinTColor: '#505050',
}

export default function DrawerNavigator({navigation,route}) {

  const lastPressTime = useRef(0);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if(lastPressTime.current + 2000 >= Date.now()) {
          return false  //返回false会冒泡到navigation的监听器然后退出
        }else{
          lastPressTime.current = Date.now();
          ToastAndroid.show('再按一次退出',500);
          return true
        }
      }
      BackHandler.addEventListener('hardwareBackPress',onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress',onBackPress);
    },[])
  )

  return (
    <TestContext.Provider value={{navigation}}>
      <Drawer.Navigator 
        backBehavior="none"
        initialRouteName="TVandMovie"
        drawerType="slide"
        screenOptions={commonOpts}
        drawerStyle={{
          width: '60%'
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