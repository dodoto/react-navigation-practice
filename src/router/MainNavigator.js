import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawNavigator from './DrawNavigator';
import DrawerContent from './components/DrawerContent';

const Main = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Main.Navigator 
      initialRouteName="Home"
      drawerType="slide"
      drawerStyle={{
        width: '68%',
        backgroundColor: '#ff3e68'
      }}
      // minSwipeDistance={9000}
      overlayColor={0}
      drawerContent={DrawerContent}
    >
      <Main.Screen name="Home"  getComponent={()=> DrawNavigator}/>
    </Main.Navigator>
  );
}