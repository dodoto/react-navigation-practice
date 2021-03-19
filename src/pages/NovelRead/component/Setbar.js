import React, { memo, useContext, useEffect } from 'react';
import { Text, StyleSheet, View, DeviceEventEmitter, BackHandler, TouchableHighlight } from 'react-native';
import Animated from 'react-native-reanimated';

import { TestContext } from '../../../context/TestContext';
import { useBackHandler, useReadMenuAnima } from '../../../request/api/hook';
import { H } from '../../../util/const';

export default memo(function Setbar({size,onChange}) {

  const { translate:translateY, state } = useReadMenuAnima(H,'callSetbar');

  const { theme } = useContext(TestContext);

  const dismiss = () => {
    DeviceEventEmitter.emit('callSetbar');
  }

  const small = () => onChange('s');

  const medium = () => onChange('m');

  const large = () => onChange('l');

  const xlarge = () => onChange('xl');

  //监听安卓返回键
  const backHandler = () => {
    if(state.current) {
      DeviceEventEmitter.emit('callSetbar');
      return true
    }else{
      return false
    }
  };
  useBackHandler(backHandler);

  return (
    <Animated.View style={[styles.wrapper,{transform:[{translateY}]}]}>
      <Text style={{flex:1}} onPress={dismiss}></Text>
      <View style={[styles.setbar,theme]}>
        <TouchableHighlight onPress={small}  underlayColor="#96c5e3" style={styles.center}>
          <Text style={[theme,styles.s,styles.center,size === 's' && styles.checked]} >小</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={medium} underlayColor="#96c5e3" style={styles.center}>
          <Text style={[theme,styles.m,styles.center,size === 'm' && styles.checked]} >中</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={large} underlayColor="#96c5e3" style={styles.center}>
          <Text style={[theme,styles.l,styles.center,size === 'l' && styles.checked]} >大</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={xlarge} underlayColor="#96c5e3" style={styles.center}>
          <Text style={[theme,styles.xl,styles.center,size === 'xl' && styles.checked]} >超大</Text>
        </TouchableHighlight>
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
    height: 60,
    backgroundColor: '#fff',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  center: {
    textAlign: 'center',
    borderRadius: 100,
  },
  s: { 
    fontSize: 14,
    width: 24, height: 24,
    lineHeight: 24
  },
  m: { 
    fontSize: 16,
    width: 26, height: 25,
    lineHeight: 26
  },
  l: { 
    fontSize: 18,
    width: 28, height: 28,
    lineHeight: 28
  },
  xl: { 
    fontSize: 20,
    width: 30, height: 30,
    lineHeight: 30
  },
  checked: {
    backgroundColor: '#96c5e3',
    color: '#fff',
  }
})