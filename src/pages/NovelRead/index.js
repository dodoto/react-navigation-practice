import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, DeviceEventEmitter, Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
// import { ScrollView as GesScrollView, PanGestureHandler } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '../../components/Loading';
import HeadMenu from './component/HeadMenu';
import FootMenu from './component/FootMenu';
import Catalog from './component/Catalog';
import { useFetch } from '../../request/api/hook';
import { novelRead } from '../../request/api/novels';
import { TestContext } from '../../context/TestContext';


// 0 UNDETERMINED
// 1 FAILED
// 2 BEGAN
// 3 CANCELLED
// 4 ACTIVE
// 5 END

//使用 DeviceEventEmitter 进行组件通讯

const colors = {
  Black: '#222',
  Asparagus: '#eee'
}

const themes = {
  default: {
    color: colors.Black,
    backgroundColor: colors.Asparagus,
  },
  reverse: {
    color: colors.Asparagus,
    backgroundColor: colors.Black
  }
}

export default function NovelRead({navigation,route:{params:{href,title,index,result:catalog}}}) {

  const [theme,setTheme] = useState('default');

  const currentIndex = useRef(index);     //保存index,供后边修改

  const { result, loading, setResult, abortController, setLoading } = useFetch(novelRead,[href]);

  const callMenu = () => {
    DeviceEventEmitter.emit('callMenu');
  }

  //监听滚动 查看是否到底或者到顶判断 载入 下一章 或 上一章 如果页面内容小于容器内容不能滚动那么该方法就无法监听
  // const scrollEndHandler = ({nativeEvent}) => {
  //   let { contentOffset: { y }, contentSize: { height }, layoutMeasurement: { height: boxHeight }} = nativeEvent;
  //   let delta = 0; 
  //   let index = currentIndex.current;
  //   if(index !== 0 && y === 0) delta = -1;   // prev
  //   if(index !== (catalog.length - 1) && (height - y - boxHeight) < 4 ) delta = 1; //next
  //   let newIndex = index + delta;
  //   console.log('drag end',nativeEvent,index)
  //   if(newIndex === index) return
  //   let href = catalog[newIndex]['href']
  //   let title = catalog[newIndex]['chapter']
  //   // console.log(href,title);
  //   currentIndex.current = newIndex;
  //   DeviceEventEmitter.emit('chapterTurn',{href,title,index:newIndex,hidde:true});
  // }
  const chapterTurn = (delta) => {
    let oldIndex = currentIndex.current ;
    if(oldIndex === 0 && delta === -1) return 
    if(oldIndex === catalog.length - 1 && delta === 1) return
    let newIndex = oldIndex + delta;
    let href = catalog[newIndex]['href']
    let title = catalog[newIndex]['chapter']
    currentIndex.current = newIndex;
    DeviceEventEmitter.emit('chapterTurn',{href,title,index:newIndex,hidde:true});

  };

  //读取本地主题 要在上一个页面读取完成
  useEffect(()=>{
    AsyncStorage.getItem('theme').then(res => {
      if(res) setTheme(res)
    })
  },[])

  //监听换章,更新内容,修改标题
  useEffect(()=>{
    let handler = ({href,title,index}) => {
      setLoading(true)
      currentIndex.current = index;
      novelRead(href,abortController.current.signal)
      .then(res => {
        setResult(res);
        navigation.setParams({title});
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
    };
    DeviceEventEmitter.addListener('chapterTurn',handler);
    return () => DeviceEventEmitter.removeAllListeners('chapterTurn');
  },[])

  const isFirst = currentIndex.current === 0;
  const isLast = currentIndex.current === catalog.length - 1;
  const themeStyle = themes[theme];

  return (
    <TestContext.Provider value={{ theme: themes[theme], themeName: theme, setTheme }}>
      <>
        <StatusBar hidden/>
        <HeadMenu title={title} navigation={navigation}/>
        {
          loading ?
          <Loading />:
          <View style={{flex:1}}>
            <ScrollView style={themeStyle}>
              <Text style={[styles.content,themeStyle]} onPress={callMenu}>{result}</Text>
              <View style={styles.btnBox}>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>chapterTurn(-1)}>
                  <Text style={[styles.btn,themeStyle,isFirst && styles.disable]}>上一章</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5} onPress={()=>chapterTurn(1)}>
                  <Text style={[styles.btn,themeStyle,isLast && styles.disable]}>下一章</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        }
        <FootMenu />
        <Catalog catalog={catalog} index={index} />
      </>
    </TestContext.Provider>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize:18,
    margin:20
  },
  btnBox: {
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    marginBottom:20
  },
  btn: {
    paddingHorizontal:20,
    lineHeight:40
  },
  disable: {
    color: 'transparent'
  }
});