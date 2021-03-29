import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, DeviceEventEmitter, Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
// import { ScrollView as GesScrollView, PanGestureHandler } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loading from '../../components/Loading';
import Menu from './component/Menu';
import Catalog from './component/Catalog';
import Setbar from './component/Setbar';
import { useChapterTurn, useFetch } from '../../request/api/hook';
import { novelRead } from '../../request/api/novels';
import { TestContext } from '../../context/TestContext';

//使用 DeviceEventEmitter 进行组件通讯

const colors = {
  Default: '#dcecd2',
  DefaultText: '#666',
  Reverse: '#32373b',
  ReverseText: '#999'
}

const fontSizes = {
  s: 14,
  m: 16,
  l: 18,
  xl: 20
}

const themes = {
  default: {
    color: colors.DefaultText,
    backgroundColor: colors.Default,
  },
  reverse: {
    color: colors.ReverseText,
    backgroundColor: colors.Reverse
  }
}

export default function NovelRead({navigation,route:{params:{href,title,index,result:catalog,id,bookName}}}) {

  const [theme,setTheme] = useState('default');

  const [size,setSize] = useState('s');

  const [currentIndex,setCurrentIndex] = useState(index);     //保存index,供后边修改

  const [isAdded,setIsAdded] = useState(false);

  const bookshelfRef = useRef([]);

  const { result, loading, setResult, abortController, setLoading } = useFetch(novelRead,[href]);

  const switchSize = (size) => {
    AsyncStorage.setItem('fontSize',size);
    setSize(size)
  };

  const callMenu = () => {
    DeviceEventEmitter.emit('callMenu');
  }

  const chapterTurn = (delta) => {
    if(currentIndex === 0 && delta === -1) return 
    if(currentIndex === catalog.length - 1 && delta === 1) return
    let newIndex = currentIndex + delta;
    let href = catalog[newIndex]['href']
    let title = catalog[newIndex]['chapter']
    DeviceEventEmitter.emit('chapterTurn',{href,title,index:newIndex,hidde:true});
  };

  const chapterHandler = ({href,title,index}) => {
    setLoading(true)
    novelRead(href,abortController.current.signal)
    .then(res => {
      setResult(res);
      setCurrentIndex(index);
      navigation.setParams({title});
    })
    .catch(err => console.log(err))
    .finally(() => setLoading(false))
  };

  //读取本地主题 和收藏列表 
  useEffect(()=>{
    AsyncStorage.multiGet(['theme','bookshelf','fontSize'])
    .then(res => {
      let theme = res[0][1];
      let bookshelf = res[1][1];
      let fontSize = res[2][1];
      if(fontSize) setSize(fontSize);
      if(theme) setTheme(theme);
      if(bookshelf) {
        bookshelfRef.current = JSON.parse(bookshelf);
        let index = bookshelfRef.current.findIndex((item) => item.id === id);
        if(index >= 0) setIsAdded(true);
      }
    })
  },[])

  //监听换章,更新内容,修改标题
  useChapterTurn(chapterHandler);

  //监听添加书柜
  useEffect(()=>{
    let handler = () => {
      let { href, chapter:title } = catalog[currentIndex];
      if(isAdded) {
        bookshelfRef.current = bookshelfRef.current.filter(item => item.id !== id);
      }else{
        bookshelfRef.current.unshift({href,title,id,index:currentIndex,bookName});  
      }
      let bookshelf = JSON.stringify(bookshelfRef.current);
      AsyncStorage.setItem('bookshelf',bookshelf)
      setIsAdded(!isAdded);
    }
    let listener = DeviceEventEmitter.addListener('callAddToBookshelf',handler);
    return () => {
      listener.remove();
      bookshelfRef.current.forEach(item => {
        if(item.id === id) {
          let { href, chapter } = catalog[currentIndex];
          item.title = chapter;
          item.href = href;
          item.index = currentIndex;
        }
      })
      let bookshelf = JSON.stringify(bookshelfRef.current);
      AsyncStorage.setItem('bookshelf',bookshelf);
      DeviceEventEmitter.emit('callUpdateBookshelf');
    }
  },[currentIndex,isAdded])

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === catalog.length - 1;
  const themeStyle = themes[theme];
  const fontSize = {fontSize:fontSizes[size]};

  return (
    <TestContext.Provider value={{ theme: themes[theme], themeName: theme, setTheme }}>
      <>
        {/* <HeadMenu title={title} navigation={navigation}/> */}
        {
          loading ?
          <Loading />:
          <ScrollView style={themeStyle}>
            <Text style={[styles.content,themeStyle,fontSize]} onPress={callMenu}>{result}</Text>
            <View style={styles.btnBox}>
              <TouchableOpacity activeOpacity={0.5} onPress={()=>chapterTurn(-1)}>
                <Text style={[styles.btn,themeStyle,isFirst && styles.disable]}>上一章</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={()=>chapterTurn(1)}>
                <Text style={[styles.btn,themeStyle,isLast && styles.disable]}>下一章</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        }
        {/* <FootMenu /> */}
        <Menu title={title} navigation={navigation} isAdded={isAdded}/>
        <Setbar size={size} onChange={switchSize}/>
        <Catalog catalog={catalog} currentIndex={currentIndex} />
      </>
    </TestContext.Provider>
  );
}

const styles = StyleSheet.create({
  content: {
    fontSize:18,
    margin:20,
    marginBottom: 0
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
