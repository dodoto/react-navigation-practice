import React, { memo, useContext, useEffect } from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View, DeviceEventEmitter, StatusBar } from 'react-native';
import Animated, { Easing, useValue } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useReadMenuAnima } from '../../../request/api/hook';
import { useThemeContext } from '../../../context';

export default memo(function Menu({title,back,isAdded,collect,cancel}) {

  const { theme, setTheme, themeName } = useThemeContext();

  const { translate:headTranslateY } = useReadMenuAnima(-70,'callMenu');

  const footTranslateY = headTranslateY.interpolate({
    inputRange: [-70,0],
    outputRange: [70,0],
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

  const changeAddState = () => {
    if(isAdded) {
      cancel()
    }else{
      collect()
    }
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

  useEffect(()=>{
    StatusBar.setHidden(true);
    let current = 0;
    const statusHandler = DeviceEventEmitter.addListener('callMenu',()=>{
      if(current === 0) {
        StatusBar.setHidden(false);
        current = 1;
      }else{
        StatusBar.setHidden(true);
        current = 0;
      } 
    })  
    return () => {
      statusHandler.remove();
      StatusBar.setHidden(false);
    }
  },[])

  //根据主题设置statusbar 字体色
  useEffect(()=>{
    if(themeName === 'default') {
      StatusBar.setBarStyle('dark-content');
    }else{
      StatusBar.setBarStyle('light-content');
    }
  },[themeName])
  //退出当前页面后
  useEffect(()=>{
    return () => StatusBar.setBarStyle('dark-content')
  },[])

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
          onPress={changeAddState}
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
    height: 65,
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