import React, { useEffect } from 'react';
import { StatusBar, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerNavigator from './src/router/DrawerNavigator';


const App: () => React$Node = () => {
  useEffect(()=>{
    let handler = () => {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setBarStyle('dark-content');
    };
    AppState.addEventListener('focus',handler);
    return () => AppState.removeEventListener('focus',handler);
  },[]);
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle='dark-content'/>
      <SafeAreaProvider>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default App;