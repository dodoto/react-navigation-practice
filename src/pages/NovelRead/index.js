import React, { useRef, useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter, Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
// import { ScrollView as GesScrollView, PanGestureHandler } from 'react-native-gesture-handler'

import { connect } from 'react-redux';

import Loading from '../../components/Loading';
import Menu from './component/Menu';
import Catalog from './component/Catalog';
import Setbar from './component/Setbar';
import { useFetch } from '../../request/api/hook';
import { novelRead } from '../../request/api/novels';
import { TestContext } from '../../context/TestContext';
import { fontSizes, themes } from './config/styleConst';
import { 
  setFontSize, 
  setTheme,
  updateBookshelfItem,
  addBookshelfItem,
  removeBookshelfItem,
  updateCurrentNovel
} from '../../store/module/ReaderModule/ActionCreators';
import AsyncStorage from '@react-native-async-storage/async-storage';

//使用 DeviceEventEmitter 进行组件通讯

function NovelRead({
  theme,
  size,
  catalog,
  add,
  info,
  remove,
  bookshelf,
  updateBookshelf,
  changeTheme,
  changeSize,
  updateInfo,
  navigation,
  route:{params:{title,href,index,id}}
}) {

  const catalogRef = useRef();

  const [currentIndex,setCurrentIndex] = useState(index);     //保存index,供后边修改

  const [isAdd,setIsAdd] = useState(false);

  const { result, loading, setResult, abortController, setLoading } = useFetch(novelRead,[href]);

  const callMenu = () => {
    DeviceEventEmitter.emit('callMenu');
  }

  const back = () => navigation.goBack();

  //取消收藏
  const cancel = () => {
    setIsAdd(false);
    remove(id);
  };

  //添加收藏
  const collect = () => {
    setIsAdd(true);
    add(info);
  }

  const changePage = useCallback((index,title,href)=>{
    setLoading(true)
    novelRead(href,abortController.current.signal)
    .then(res => {
      setResult(res);
      setCurrentIndex(index);
      navigation.setParams({title});
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false);
      catalogRef.current.scrollToIndex({animated:false,index});
    })
  },[]);

  //监听换章,更新内容,修改标题
  // useChapterTurn(chapterHandler);
  //更新 currentNovelInfo
  useEffect(()=>{
    let index = currentIndex;
    let href = catalog[index]['href'];
    let title = catalog[index]['chapter'];
    updateInfo(title,index,href);
  },[currentIndex]);
  //是否添加
  useEffect(() => {
    let index = bookshelf.findIndex(item => item.id === id);
    if(index >= 0) setIsAdd(true);
  },[])
  //如果标记,更新收藏记录
  useEffect(()=>{
    if(isAdd) {
      updateBookshelf(info);
    }
  },[isAdd,info])

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === catalog.length - 1;
  const themeStyle = themes[theme];
  const fontSize = {fontSize:fontSizes[size]};

  const prevPage = () => {
    if(!isFirst) {
      let index = currentIndex - 1;
      let title = catalog[index].chapter;
      let href = catalog[index].href;
      changePage(index,title,href);
    }
  }

  const nextPage = () => {
    if(!isLast) {
      let index = currentIndex + 1;
      let title = catalog[index].chapter;
      let href = catalog[index].href;
      changePage(index,title,href);
    }
  }

  return (
    <>
      {
        loading ?
        <Loading style={themeStyle}/>:
        <ScrollView style={themeStyle}>
          <Text style={[styles.content,themeStyle,fontSize]} onPress={callMenu}>{result}</Text>
          <View style={styles.btnBox}>
            <TouchableOpacity activeOpacity={0.5} onPress={prevPage}>
              <Text style={[styles.btn,themeStyle]}>{ !isFirst && '上一章'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={nextPage}>
              <Text style={[styles.btn,themeStyle]}>{ !isLast && '下一章'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
      <TestContext.Provider value={{ theme: themes[theme], themeName: theme, setTheme:changeTheme }}>
        <>
          <Menu 
            title={title} 
            back={back} 
            isAdded={isAdd}
            collect={collect}
            cancel={cancel}
          />
          <Setbar size={size} onChange={changeSize}/>
          <Catalog catalog={catalog} currentIndex={currentIndex} change={changePage} ref={catalogRef}/>
        </>
      </TestContext.Provider>
    </>
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

const mapState = state => ({
  bookshelf: state['ReaderModule']['ReaderBookshelfReducer'],
  info: state['ReaderModule']['ReaderCurrentNovelReducer'],
  theme: state['ReaderModule']['ReaderStyleReducer']['theme'],
  size: state['ReaderModule']['ReaderStyleReducer']['fontSize'],
  catalog: state['ReaderModule']['ReaderCatalogReducer']
});

const mapDispatch = dispatch => ({
  add(novel) {
    dispatch(addBookshelfItem(novel))
  },
  remove(id) {
    dispatch(removeBookshelfItem(id))
  },
  updateBookshelf(novel) {
    dispatch(updateBookshelfItem(novel))
  },
  updateInfo(title,index,href) {
    dispatch(updateCurrentNovel(title,index,href))
  },
  changeSize(size) {
    dispatch(setFontSize(size))
  },
  changeTheme(theme) {
    dispatch(setTheme(theme))
  }
});

export default connect(mapState,mapDispatch)(NovelRead);
