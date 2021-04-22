import React, { memo, useEffect, useRef, useContext } from 'react';
import { Text, StyleSheet, DeviceEventEmitter, BackHandler, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { useBackHandler, useChapterTurn, useReadMenuAnima } from '../../../request/api/hook';
import { W } from '../../../util/const';
import { keyExtractor, getItemLayout as layout } from '../../../util/fun';
import CatalogItem from './CatalogItem';
import { TestContext } from '../../../context/TestContext';

export default memo(function Catalog({catalog,currentIndex}) {

  const catalogRef = useRef();                                   //flatlist实例 

  const { theme } = useContext(TestContext);

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

  const getItemLayout = (data,index) => layout(data,index,40);

  const chapterHandler = ({index,hidde}) => {
    //如果是隐藏目录的时候换章
    if(hidde) catalogRef.current.scrollToIndex({animated:false,index});
  };

  let backHandler = () => {
    if(state.current) {
      DeviceEventEmitter.emit('callCatalog');
      return true
    }else{
      return false
    }
  };

  //监听安卓返回键
  useBackHandler(backHandler);

  //监听换章,更新当前章节标题下标
  useChapterTurn(chapterHandler);
  
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
          style={theme}
          data={catalog}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          windowSize={10}
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