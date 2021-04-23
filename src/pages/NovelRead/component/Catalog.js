import React, { memo, useEffect, useContext, forwardRef } from 'react';
import { Text, StyleSheet, DeviceEventEmitter, FlatList } from 'react-native';
import Animated from 'react-native-reanimated';

import { useBackHandler, useReadMenuAnima } from '../../../request/api/hook';
import { W } from '../../../util/const';
import { keyExtractor, getItemLayout as layout } from '../../../util/fun';
import CatalogItem from './CatalogItem';
import { TestContext } from '../../../context/TestContext';

export default memo(forwardRef(function Catalog({catalog,currentIndex,change},ref) {

                                     //flatlist实例 

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
      <CatalogItem 
        change={change}
        title={item.chapter}
        href={item.href} 
        index={item.index} 
        isCurrent={isCurrent}
      />
    );
  };

  const getItemLayout = (data,index) => layout(data,index,40);

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
  
  //滚动到当前章节
  useEffect(()=>{
    if(currentIndex > 0) ref.current.scrollToIndex({animated:false,index:currentIndex});
  },[])

  return (
    <>
      {/* 背景 */}
      <Animated.View style={[styles.modal,{opacity}]} pointerEvents="box-none"></Animated.View>
      {/* 目录 */}
      <Animated.View style={[styles.catalogBox,{transform:[{translateX}]}]}>
        <Text style={styles.cancel} onPress={dismiss}></Text>
        <FlatList 
          ref={ref}
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
}))

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