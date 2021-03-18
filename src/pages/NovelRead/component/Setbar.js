import React, { memo, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, DeviceEventEmitter, BackHandler } from 'react-native';
import Animated from 'react-native-reanimated';

import { TestContext } from '../../../context/TestContext';
import { useReadMenuAnima } from '../../../request/api/hook';
import { H } from '../../../util/const';

export default memo(function Setbar() {

  const { translate:translateY, state } = useReadMenuAnima(H,'callSetbar');

  const { theme } = useContext(TestContext);

  const dismiss = () => {
    DeviceEventEmitter.emit('callSetbar');
  }

  //监听安卓返回键
  useEffect(()=>{
    let handler = () => {
      if(state.current) {
        DeviceEventEmitter.emit('callSetbar');
        return true
      }else{
        return false
      }
    };
    BackHandler.addEventListener('hardwareBackPress',handler)
    return () => BackHandler.removeEventListener('hardwareBackPress',handler)
  },[])

  return (
    <Animated.View style={[styles.wrapper,{transform:[{translateY}]}]}>
      <Text style={{flex:1}} onPress={dismiss}></Text>
      <View style={[styles.setbar,theme]}>
        <Text style={theme}>我是设置栏</Text>
      </View>
    </Animated.View>
  );
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0, top: 0,
    justifyContent: 'flex-end'
  },
  setbar: {
    height: 120,
    backgroundColor: '#fff',
    elevation: 10
  }
})