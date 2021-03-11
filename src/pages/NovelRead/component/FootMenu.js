import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, DeviceEventEmitter, TouchableNativeFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import { useReadMenuAnima } from '../../../request/api/hook';

//   
export default memo(function FootMenu() {

  const { translate:translateY } = useReadMenuAnima(60,'callMenu');

  const callCatlog = () => {
    DeviceEventEmitter.emit('callMenu')
    DeviceEventEmitter.emit('callCatalog')
  }

  return (
    <Animated.View style={[styles.wrapper,{transform:[{translateY}]}]}>
      {/* <Text onPress={callCatlog}>我是底部菜单</Text> */}
      <TouchableNativeFeedback 
        onPress={callCatlog}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name="list"  size={22} />
          <Text style={styles.tip}>目录</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback 
        // onPress={back}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name="settings"  size={22} />
          <Text style={styles.tip}>设置</Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback 
        // onPress={back}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name="moon"  size={22} />
          <Text style={styles.tip}>夜间</Text>
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