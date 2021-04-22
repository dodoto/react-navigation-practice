import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, PanResponder, FlatList, Text, StyleSheet, RefreshControl } from 'react-native';
//使用 PanResponder 来做手势

import { novelDetail } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import { keyExtractor, getItemLayout as layout } from '../../util/fun';
import Chapter from './component/Chapter';
import NovelPage from './component/NovelPage';
import NovelInfoBox from './component/NovelInfoBox';
import { H } from '../../util/const';


function getItemLayout(data,index) {
  return layout(data,index,50);
}

export default function NovelDetail({navigation, route: {params:{id, title, index, author, imgUrl, descr}}}) {

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

  const renderData = result?.slice((page-1) *100,page * 100);

  const pickers = useRef();  //分页器数据      
  
  const list = useRef();

  // const state = useValue(-1);

  const renderItem = ({item}) => {
    return (
      <Chapter 
        bookName={title}
        title={item.chapter} 
        href={item.href} 
        index={item.index} 
        result={result} 
        id={id} 
        author={author}
        imgUrl={imgUrl}
        descr={descr}
        navigation={navigation}
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
          ListHeaderComponent={
            <NovelInfoBox 
              id={id} 
              author={author} 
              imgUrl={imgUrl} 
              descr={descr} 
              navigation={navigation} 
              result={result}
            />
          }
        />
      }
    </>
  );
}