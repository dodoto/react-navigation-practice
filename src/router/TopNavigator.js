import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TVandMovie from '../pages/TVandMovie/index';

const TopTab = createMaterialTopTabNavigator();

const TabBarOptions = {
  inactiveTintColor: '#fff',
  activeTintColor: '#fff',
  scrollEnabled: true,
  indicatorStyle: {
    backgroundColor: '#fdd200',
  },
  style: {
    backgroundColor: '#1f1f1f'
  },
  tabStyle: {
    width: 100,
  }
};

export default function TopTabNavigator() {

  useEffect(()=>{
    SplashScreen.hide();
  },[]);

  return (
    <>
      <TopTab.Navigator
        lazy
        tabBarOptions={TabBarOptions}
      >
        <TopTab.Screen name="昆仑德语社" getComponent={()=> TVandMovie}/>
        <TopTab.Screen name="欧美剧集" getComponent={()=> TVandMovie}/>
        <TopTab.Screen name="欧美电影" getComponent={()=> TVandMovie}/>
        <TopTab.Screen name="综艺纪录" getComponent={()=> TVandMovie}/>
        <TopTab.Screen name="fix法语社" getComponent={()=> TVandMovie}/>
        <TopTab.Screen name="fix韩语社" getComponent={()=> TVandMovie}/>
        <TopTab.Screen name="fix日语社" getComponent={()=> TVandMovie}/>
      </TopTab.Navigator>
    </>
  );
}