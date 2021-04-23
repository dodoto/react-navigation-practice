import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDefaultHeaderHeight } from '@react-navigation/drawer/src/views/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PanGestureHandler, State, FlatList } from 'react-native-gesture-handler';
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
    Clock,
  } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

import { H, W } from '../../../util/const';
import { keyExtractor } from '../../../util/fun';
import { runTiming } from '../../../util/animation';
import { 
  setBookshelf, 
  setTheme, 
  setFontSize, 
  removeBookshelfItem 
} from '../../../store/module/ReaderModule/ActionCreators';
import ReadRecord from './ReadRecord';

// input 90
//translateY max = boxHeight - 50, min = 0
//每次手势都是从0开始
const layout = { width: W, height: H };

function Bookshelf({toNovelDetail,setData,removeDataItem,data,initFontSize,initTheme}) {

  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(layout,insets.top);

  const boxHeight = H - headerHeight - 90;

  const translateInitY = useValue(boxHeight - 50);              //初始值

  const translateGsY = useValue(0);                             //变化值

  const state = useValue(-1);                                   //手势阶段 

  const clock = useRef(new Clock()).current;                    //一个 clock

  const bookshelf = useRef();

  const renderItem = ({item}) => {
    const {author, imgUrl, descr, id, title, index, bookName, href} = item;
    return (
      <ReadRecord 
        remove={removeDataItem}
        onPress={toNovelDetail}
        author={author}
        imgUrl={imgUrl}
        descr={descr}
        id={id}
        title={title}
        index={index}
        bookName={bookName}
        href={href}
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

  //读取本地主题 和收藏列表 
  useEffect(()=>{
    AsyncStorage.multiGet(['theme','bookshelf','fontSize'])
    .then(res => {
      let theme = res[0][1];
      let bookshelf = res[1][1];
      let fontSize = res[2][1];
      if(theme) initTheme(theme);
      if(bookshelf) setData(JSON.parse(bookshelf));
      if(fontSize) initFontSize(fontSize);
    })
  },[])

  useEffect(() => {
    if(data) {
      AsyncStorage.setItem('bookshelf',JSON.stringify(data))
    }
  },[data])

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
      <FlatList 
        ref={bookshelf}
        style={{marginVertical:10}}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        shouldCancelWhenOutside
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

const mapState = state => ({
  data: state['ReaderModule']['ReaderBookshelfReducer']
});

const mapDispatch = dispatch => ({
  setData(data) {
    dispatch(setBookshelf(data))
  },
  removeDataItem(id) {
    dispatch(removeBookshelfItem(id))
  },
  initTheme(theme) {
    dispatch(setTheme(theme))
  },
  initFontSize(size) {
    dispatch(setFontSize(size))
  }
});

export default connect(mapState, mapDispatch)(Bookshelf)

