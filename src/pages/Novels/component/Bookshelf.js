import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getDefaultHeaderHeight } from '@react-navigation/drawer/src/views/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, 
  { 
    useValue, 
    cond, 
    event, 
    eq, 
    set, 
    add, 
    or,
    greaterOrEq, 
    lessOrEq, 
    lessThan, 
    greaterThan, 
    block, 
    max, 
    min,  
    diffClamp,
    and,
    timing,
    Easing,
    Value,
    Clock,
    clockRunning,
    stopClock,
    startClock
  } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { H, W } from '../../../util/const';

//时钟 初始值 最终值
function runTiming( clock: Animated.Clock, value: Animated.Value<number>, dest: number ) {
  const state = {
      finished  : new Value(0),
      position  : new Value(0),
      frameTime : new Value(0),
      time      : new Value(0)
  };
  const config = {
      toValue  : new Value(0),
      duration : 300,
      easing   : Easing.linear
  };
  
  return [
    cond(
      clockRunning(clock),
      0,
      [
        set(state.finished, 0),
        set(state.frameTime, 0),
        set(state.time, 0),
        set(state.position, value),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position
  ]
};
// input 90
//translateY max = boxHeight - 50, min = 0
//每次手势都是从0开始
const layout = { width: W, height: H };

export default function Bookshelf() {

  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(layout,insets.top);

  const boxHeight = H - headerHeight - 90;

  const translateInitY = useValue(boxHeight - 50);              //初始值

  const translateGsY = useValue(0);                             //变化值

  const state = useValue(-1);                                   //手势阶段 

  const clock = useRef(new Clock()).current;                    //一个 clock

  const handler = event(
    [{nativeEvent: {translationY: translateGsY, state }}],
  )
  
  const translateY = cond(
    eq(state, State.END),                                       //判断是否活跃
    cond(
      greaterThan(add(translateInitY,translateGsY),(boxHeight-50)/2),
      [
        set(translateInitY,add(translateInitY,translateGsY)),
        set(translateInitY,runTiming(clock,translateInitY,boxHeight-50))
      ],
      [
        set(translateInitY,add(translateInitY,translateGsY)),
        set(translateInitY,runTiming(clock,translateInitY,0))
      ]
    ),                           
    diffClamp(
      add(translateInitY,translateGsY),
      0,
      boxHeight - 50
    )
  )

  return (
    <PanGestureHandler
      onGestureEvent={handler}
      onHandlerStateChange={handler}
    >
    <Animated.View style={[styles.bookshelf,{transform:[{translateY}]}]}>
      <View style={styles.head}>
        <Text style={styles.title}>我的书架</Text>
      </View>
      
      <ScrollView>
        <Text style={{height:600}}>我是书架</Text>
      </ScrollView>
    </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  bookshelf: {
    position: 'absolute',
    backgroundColor: 'yellow',
    left: 0, right: 0, bottom: 0,top: 0,
    // minHeight: HEIGHT
  },
  head: {
    backgroundColor: '#fff',
    elevation: 3,
    position: 'relative',
    height:50
  },
  title: {
    lineHeight: 50,
    position: 'absolute',
    left: 0, right: 0, bottom: -5,
    textAlign: 'center',
    backgroundColor: '#fff'
  }
});

