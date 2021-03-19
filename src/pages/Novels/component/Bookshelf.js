import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, DeviceEventEmitter, LayoutAnimation } from 'react-native';
import { getDefaultHeaderHeight } from '@react-navigation/drawer/src/views/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, State, ScrollView, FlatList } from 'react-native-gesture-handler';
import Animated, 
  { 
    useValue, 
    cond, 
    event, 
    eq, 
    set, 
    add,  
    lessThan, 
    diffClamp,
    timing,
    Easing,
    Value,
    Clock,
    clockRunning,
    stopClock,
    startClock,
  } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { H, W } from '../../../util/const';
import { keyExtractor } from '../../../util/fun';
import ReadRecord from './ReadRecord';

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
      duration : 150,
      easing   : Easing.linear
  };
  
  return [
    cond(
      clockRunning(clock),
      [
        set(config.toValue,dest)
      ],
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

export default function Bookshelf({toNovelDetail}) {

  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(layout,insets.top);

  const boxHeight = H - headerHeight - 90;

  const translateInitY = useValue(boxHeight - 50);              //初始值

  const translateGsY = useValue(0);                             //变化值

  const state = useValue(-1);                                   //手势阶段 

  const clock = useRef(new Clock()).current;                    //一个 clock

  const bookshelf = useRef();

  const [books,setBooks] = useState([]);

  const remove = (href) => {
    let result = books.filter(item => item.href !== href);
    AsyncStorage.setItem('bookshelf',JSON.stringify(result));
    LayoutAnimation.spring();
    setBooks(result);
  }

  const renderItem = ({item}) => {
    return (
      <ReadRecord 
        remove={remove}
        onPress={toNovelDetail}
        href={item.href}
        bookName={item.bookName}
        index={item.index}
        title={item.title}
        id={item.id}
      />
    );
  }

  const handler = event(
    [{nativeEvent: {translationY: translateGsY, state }}],
  )

  const _translateY = diffClamp(
    add(translateInitY,translateGsY),
    0,
    boxHeight - 50
  )

  const translateY = cond(
    lessThan(state, State.ACTIVE),
    translateInitY,
    cond(
      eq(state,State.ACTIVE),
      _translateY,
      cond(
        lessThan(_translateY,(boxHeight-50)/2),
        [set(translateGsY,0),set(translateInitY,runTiming(clock,_translateY,0))],
        [set(translateGsY,0),set(translateInitY,runTiming(clock,_translateY,boxHeight-50))]
      )
    )
  )

  useEffect(()=>{
    let handler = () => {
      AsyncStorage.getItem('bookshelf')
      .then(res => {
        if(res) setBooks(JSON.parse(res))
      })
      .catch(err => console.log(err))
    }
    handler();
    let listener = DeviceEventEmitter.addListener('callUpdateBookshelf',handler);
    return () => listener.remove();
  },[])

  return (
    <PanGestureHandler
      onGestureEvent={handler}
      onHandlerStateChange={handler}
      waitFor={bookshelf}
    >
    <Animated.View style={[styles.bookshelf,{transform:[{translateY}]}]}>
      <View style={styles.head}>
        <Text style={styles.title}>我的书架</Text>
      </View>
      
      {/* <ScrollView ref={bookshelf} style={{marginVertical:10}}>
       {
         books.map(item => (
                    <ReadRecord 
            remove={remove}
            onPress={toNovelDetail}
            key={item.href}
            href={item.href}
            bookName={item.bookName}
            index={item.index}
            title={item.title}
            id={item.id}
          />
         ))
       }
      </ScrollView> */}
      <FlatList 
        ref={bookshelf}
        style={{marginVertical:10}}
        data={books}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={<Text style={styles.empty}>目前没有再追的书 (。・_・。)ﾉ </Text>}
      />
    </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  bookshelf: {
    position: 'absolute',
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
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#909399'
  }
});

