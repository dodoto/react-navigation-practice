import React, { memo, useContext } from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View, DeviceEventEmitter } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import { useReadMenuAnima } from '../../../request/api/hook';
import { TestContext } from '../../../context/TestContext';

export default memo(function Menu({title,navigation}) {

  const { theme, setTheme, themeName } = useContext(TestContext);

  const { translate:headTranslateY } = useReadMenuAnima(-60,'callMenu');

  const footTranslateY = headTranslateY.interpolate({
    inputRange: [-60,0],
    outputRange: [60,0],
    extrapolate: 'clamp'
  })

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

  const back = () => {
    navigation.goBack();
  };

  return (
    <>
      <Animated.View style={[styles.wrapper,styles.head,theme,{transform:[{translateY:headTranslateY}]}]}>
        <TouchableNativeFeedback 
          onPress={back}
          background={TouchableNativeFeedback.Ripple('#666',true,20)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={{justifyContent:'center'}}>
            <Feather name="arrow-left"  size={26} style={theme}/>
          </View>
        </TouchableNativeFeedback>
        <Text style={[styles.title,theme]}>{title}</Text>
        {/* <TouchableNativeFeedback 
          onPress={back}
          background={TouchableNativeFeedback.Ripple('#666',true,20)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={{justifyContent:'center',position:'absolute',right:20,top:0,bottom:0}}>
            <Feather name="bookmark"  size={24} />
          </View>
        </TouchableNativeFeedback> */}
      </Animated.View>

      <Animated.View style={[styles.wrapper,styles.foot,theme,{transform:[{translateY:footTranslateY}]}]}>
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
    </>

  );
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0, right: 0,
    flexDirection: 'row',
    elevation: 2,
    height: 60,
  },
  head: {
    top: 0, 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    marginLeft: 20
  },
  foot: {
    bottom: 0,
    justifyContent: 'space-around'
  },
  tip: {
    fontSize: 12,
    lineHeight: 20
  }
});