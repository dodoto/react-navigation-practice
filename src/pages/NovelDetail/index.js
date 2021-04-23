import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, PanResponder, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
//使用 PanResponder 来做手势
import { connect } from 'react-redux'; 
import { novelDetail } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import { keyExtractor, getItemLayout as layout } from '../../util/fun';
import Chapter from './component/Chapter';
import NovelPage from './component/NovelPage';
import NovelInfoBox from './component/NovelInfoBox';
import { setCurrentNovel, resetCurrentNovel, setCatalog } from '../../store/module/ReaderModule/ActionCreators';


function getItemLayout(data,index) {
  return layout(data,index,50);
}

function NovelDetail({setInfo,clearInfo,initCatalog,navigation, route: {params:{id, bookName, index, author, imgUrl, descr,title,href}}}) {

  //一页100条
  const [ page, setPage ] = useState(1);  
  
  const { result, loading, setLoading, setResult, abortController } = useFetch(novelDetail,[id]);  //数据

  const refresh = () => {
    let message;
    setLoading(true);
    novelDetail(id,abortController.current.signal)
    .then(res => setResult(res))
    .catch(err => {
      if(err.name !== 'AbortError') ToastAndroid.show(err,300);
      message = err.message;
    })
    .finally(() => {
      // 'Aborted'
      if(message !== 'Aborted') setLoading(false)
    })
  }

  const toNovelRead = useCallback((title,href,index) => {
    navigation.navigate('NovelRead',{title,href,index,id});
  },[navigation]);

  const renderData = result?.slice((page-1) *100,page * 100);

  const pickers = useRef();  //分页器数据      
  
  const list = useRef();

  const renderItem = ({item}) => {
    return (
      <Chapter 
        title={item.chapter} 
        href={item.href} 
        index={item.index}  
        toNovelRead={toNovelRead}
      />
    );
  }
      
  const pageChange = (page) => {
    //210 = 170 + 40 NovelInfoBox
    setPage(page);
    requestAnimationFrame(() => {
      list.current.scrollToOffset({offset:170,animated:false});
    });
  };

  useEffect(()=>{
    if(result) {
      let currentPage = Math.ceil(index/100);
      if(currentPage === 0) currentPage = 1;
      setPage(currentPage);
      let total = Math.ceil(result.length/100);
      pickers.current = [...Array(total).keys()].map(item => ({label:`第${item+1}页`,value:item+1}));
    }
  },[result]);

  //保存当前要阅读的小说的信息和目录
  useEffect(() => {
    if(result) {
      initCatalog(result)
    }
  },[result]);

  useEffect(() => {
    const info = {author,bookName,descr,id,imgUrl,index,title,href};
    setInfo(info);
    return () => {
      initCatalog([])
      clearInfo()
    }
  },[])

  return (
    <>  
      {
        loading ?
        <Loading />:
        <FlatList 
          ref={list}
          data={renderData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          onRefresh={refresh}
          refreshing={loading}
          refreshControl={
            <RefreshControl 
              refreshing={loading}
              onRefresh={refresh}
              colors={['#79bbff','#67C23A']}
            />
          }
          ListFooterComponent={<NovelPage pickers={pickers} page={page} pageChange={pageChange}/>}
          ListHeaderComponent={<NovelInfoBox navigation={navigation}/>}
        />
      }
    </>
  );
}

const mapState = () => ({})

const mapDispatch = dispatch => ({
  setInfo(info) {
    dispatch(setCurrentNovel(info))
  },
  clearInfo() {
    dispatch(resetCurrentNovel())
  },
  initCatalog(catalog) {
    dispatch(setCatalog(catalog))
  }
});

export default connect(mapState,mapDispatch)(NovelDetail);