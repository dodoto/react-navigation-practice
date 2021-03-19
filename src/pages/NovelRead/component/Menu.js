import React, { memo, useContext } from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View, DeviceEventEmitter } from 'react-native';
import Animated, { Easing, useValue } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useReadMenuAnima } from '../../../request/api/hook';
import { TestContext } from '../../../context/TestContext';

export default memo(function Menu({title,navigation,isAdded}) {

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

  const callSetbar = () => {
    DeviceEventEmitter.emit('callMenu')
    DeviceEventEmitter.emit('callSetbar')
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

  const addToBookshelf = () => {
    DeviceEventEmitter.emit('callAddToBookshelf')
  };

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
        <TouchableNativeFeedback 
          onPress={addToBookshelf}
          background={TouchableNativeFeedback.Ripple('#666',true,20)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={{justifyContent:'center',position:'absolute',right:20,top:10,bottom:0}}>
            {
              isAdded ?
              <FontAwesome name="bookmark" size={26} color="#96c5e3"/>:
              <FontAwesome name="bookmark-o"  size={26} style={theme}/> 
            }
          </View>
        </TouchableNativeFeedback>
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
          onPress={callSetbar}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={{justifyContent:'center'}}>
            <Text style={[theme,{fontSize:18}]}>Aa</Text>
            <Text style={[styles.tip,theme]}>字体</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback 
          onPress={changeTheme}
          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={{justifyContent:'center'}}>
            <Feather name={themeName === 'default' ? "moon" : "sun"}  size={22} style={theme}/>
            <Text style={[styles.tip,theme]}>{themeName === 'default' ? "关灯" : "开灯"}</Text>
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
    paddingTop: 10,
  },
  title: {
    marginLeft: 20
  },
  setbar: {
    bottom: 0,
    backgroundColor: 'skyblue',
    height: 80
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