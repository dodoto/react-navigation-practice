import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawNavigator from './src/router/DrawNavigator';
import MainNavigator from './src/router/MainNavigator';


const App: () => React$Node = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <SafeAreaProvider>
          <NavigationContainer>
            {/* <DrawNavigator /> */}
            <MainNavigator />
          </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

export default App;