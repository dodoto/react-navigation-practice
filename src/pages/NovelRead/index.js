import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Text, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
// import { ScrollView as GesScrollView, PanGestureHandler } from 'react-native-gesture-handler'

import { connect } from 'react-redux';

import Loading from '../../components/Loading';
import Menu from './component/Menu';
import Catalog from './component/Catalog';
import Setbar from './component/Setbar';
import { useChapterTurn, useFetch } from '../../request/api/hook';
import { novelRead } from '../../request/api/novels';
import { TestContext } from '../../context/TestContext';
import { addNovel, removeNovel, updateNovels } from '../../store/module/novel/novelActionCreators';
import { setFontSize, setTheme } from '../../store/module/readerStyle/readerStyleActionCreators';
import { fontSizes, themes } from './config/styleConst';

//使用 DeviceEventEmitter 进行组件通讯

function NovelRead({
  add,
  remove,
  update,
  bookshelf,
  theme,
  size,
  changeSize,
  changeTheme,
  navigation,
  route:{
    params:{href,title,index,result:catalog,id,bookName,author, imgUrl, descr}
  }
}) {

  const [currentIndex,setCurrentIndex] = useState(index);     //保存index,供后边修改

  const [isAdded,setIsAdded] = useState(false);

  const { result, loading, setResult, abortController, setLoading } = useFetch(novelRead,[href]);

  const callMenu = () => {
    DeviceEventEmitter.emit('callMenu');
  }

  const back = () => navigation.goBack();

  //作者 封面 简介 id 标题 页码 书名 当前章节的地址
  const novel = {
    author, 
    imgUrl, 
    descr, 
    id, 
    title: catalog[currentIndex]['chapter'], 
    index: currentIndex, 
    bookName, href:catalog[currentIndex]['href']
  };

  //取消收藏
  const cancelCollect = () => {
    setIsAdded(false);
    remove(id);
  }

  //收藏
  const collect = () => {
    setIsAdded(true);
    add(novel);
  }

  //更新收藏状态
  const updateCollect = () => {
    // console.log('novel',novel)
    update(novel);
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

  //是否收藏
  useEffect(() => {
    let index = bookshelf?.findIndex(item => item.id === id);
    if(index >= 0) setIsAdded(true);
  },[])

  //换页且收藏更新记录
  useEffect(() => {
    if(isAdded) updateCollect();
    //更新前面的记录
    DeviceEventEmitter.emit('updateCurrentRecord',novel);
  },[isAdded,currentIndex])

  //监听换章,更新内容,修改标题
  useChapterTurn(chapterHandler);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === catalog.length - 1;
  const themeStyle = themes[theme];
  const fontSize = {fontSize:fontSizes[size]};

  return (
    <>
      {
        loading ?
        <Loading style={themeStyle}/>:
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
      <TestContext.Provider value={{ theme: themes[theme], themeName: theme, setTheme:changeTheme }}>
        <>
          <Menu 
            title={title} 
            back={back} 
            isAdded={isAdded}
            collect={collect}
            cancel={cancelCollect}
          />
          <Setbar size={size} onChange={changeSize}/>
          <Catalog catalog={catalog} currentIndex={currentIndex} />
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
  bookshelf: state['novelModule'],
  size: state['readerStyleModule']['fontSize'],
  theme: state['readerStyleModule']['theme']
});

const mapDispatch = dispatch => ({
  add(novel) {
    dispatch(addNovel(novel))
  },
  remove(id) {
    dispatch(removeNovel(id))
  },
  update(novel) {
    dispatch(updateNovels(novel))
  },
  changeSize(size) {
    dispatch(setFontSize(size))
  },
  changeTheme(theme) {
    dispatch(setTheme(theme))
  }
});

export default connect(mapState,mapDispatch)(NovelRead);
