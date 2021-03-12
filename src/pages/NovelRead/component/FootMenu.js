import React, { memo, useContext } from 'react';
import { View, Text, StyleSheet, DeviceEventEmitter, TouchableNativeFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useReadMenuAnima } from '../../../request/api/hook';
import { TestContext } from '../../../context/TestContext';
//   
export default memo(function FootMenu() {

  const { theme, setTheme, themeName } = useContext(TestContext);

  const { translate:translateY } = useReadMenuAnima(60,'callMenu');

  const callCatlog = () => {
    DeviceEventEmitter.emit('callMenu')
    DeviceEventEmitter.emit('callCatalog')
  }

  const changeTheme = () => {
    if(themeName === 'default') {
      setTheme('reverse')
      AsyncStorage.setItem('theme','reverse')
    }else{
      AsyncStorage.setItem('theme','default')
      setTheme('default')
    }
  }

  return (
    <Animated.View style={[styles.wrapper,theme,{transform:[{translateY}]}]}>
      {/* <Text onPress={callCatlog}>我是底部菜单</Text> */}
      <TouchableNativeFeedback 
        onPress={callCatlog}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name="list"  size={22} style={theme}/>
          <Text style={[styles.tip,theme]}>目录</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback 
        // onPress={back}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name="settings"  size={22} style={theme}/>
          <Text style={[styles.tip,theme]}>设置</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback 
        onPress={changeTheme}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name={themeName === 'default' ? "moon" : "sun"}  size={22} style={theme}/>
          <Text style={[styles.tip,theme]}>夜间</Text>
        </View>
      </TouchableNativeFeedback>
    </Animated.View>
  );
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 0, left: 0, bottom: 0,
    backgroundColor: '#fff',
    height: 60,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tip: {
    fontSize: 12,
    lineHeight: 20
  }
});