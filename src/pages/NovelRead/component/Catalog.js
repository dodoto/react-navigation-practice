import React, { memo, useEffect, useRef } from 'react';
import { Text, StyleSheet, DeviceEventEmitter, BackHandler, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { useReadMenuAnima } from '../../../request/api/hook';
import { W } from '../../../util/const';
import { keyExtractor } from '../../../util/fun';
import CatalogItem from './CatalogItem';


export default memo(function Catalog({catalog,currentIndex}) {

  const catalogRef = useRef();                                   //flatlist实例 

  const { translate:translateX, state } = useReadMenuAnima(W,'callCatalog');

  const opacity = translateX.interpolate({
    inputRange: [0,W],
    outputRange: [0.5,0],
    extrapolate: 'clamp'
  });

  const dismiss = () => {
    DeviceEventEmitter.emit('callCatalog');
  }

  const renderItem = ({item}) => {
    const isCurrent = currentIndex === item.index;
    return (
      <CatalogItem title={item.chapter} href={item.href} index={item.index} isCurrent={isCurrent}/>
    );
  };

  const getItemLayout = (data,index) => ({length: 40, offset: 40 * index, index});

  //监听安卓返回键
  useEffect(()=>{
    let handler = () => {
      if(state.current) {
        DeviceEventEmitter.emit('callCatalog');
        return true
      }else{
        return false
      }
    };
    BackHandler.addEventListener('hardwareBackPress',handler)
    return () => BackHandler.removeEventListener('hardwareBackPress',handler)
  },[])

  //监听换章,更新当前章节标题下标
  useEffect(()=>{
    let handler = ({index,hidde}) => {
      //如果是隐藏目录的时候换章
      if(hidde) catalogRef.current.scrollToIndex({animated:false,index});
    };
    DeviceEventEmitter.addListener('chapterTurn',handler);
    return () => DeviceEventEmitter.removeAllListeners('chapterTurn');
  },[])
  
  //滚动到当前章节
  useEffect(()=>{
    if(currentIndex > 0) catalogRef.current.scrollToIndex({animated:false,index:currentIndex});
  },[])

  return (
    <>
      {/* 背景 */}
      <Animated.View style={[styles.modal,{opacity}]} pointerEvents="box-none"></Animated.View>
      {/* 目录 */}
      <Animated.View style={[styles.catalogBox,{transform:[{translateX}]}]}>
        <Text style={styles.cancel} onPress={dismiss}></Text>
        <FlatList 
          ref={catalogRef}
          style={styles.catalog}
          data={catalog}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          windowSize={3}
        />
      </Animated.View>
    </> 
  );
})

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: '#000',
  },
  cancel: {
    width: 100,
  },
  catalogBox: {
    position: 'absolute',
    top: 0, right: 0, bottom: 0, left: 0,
    flexDirection: 'row',
  },
  catalog: {
    backgroundColor: '#fff',
  }
});