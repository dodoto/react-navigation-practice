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
import { fontSizes, themes } from './config/styleConst';
import { 
  setFontSize, 
  setTheme,
  updateBookshelfItem,
  addBookshelfItem,
  removeBookshelfItem,
  updateCurrentNovel
} from '../../store/module/ReaderModule/ActionCreators';

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

  //监听换章,更新内容,修改标题
  useChapterTurn(chapterHandler);
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
            isAdded={isAdd}
            collect={collect}
            cancel={cancel}
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
