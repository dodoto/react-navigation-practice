import React from 'react';
import { StatusBar, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import DrawerNavigator from './src/router/DrawerNavigator';
import StackNavigator from './src/router/StackNavigator';
import store from './src/store/index';
import { Provider } from 'react-redux';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle='dark-content'/>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </Provider>  
      </SafeAreaProvider>
    </>
  );
}

export default App;
