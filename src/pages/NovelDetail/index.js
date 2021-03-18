import React, { useEffect, useRef, useState } from 'react';
import { FlatList, } from 'react-native';

import { novelDetail } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import { keyExtractor, getItemLayout as layout } from '../../util/fun';
import Chapter from './component/Chapter';
import NovelPage from './component/NovelPage';


function getItemLayout(data,index) {
  return layout(data,index,50);
}

function getOffset(index) {
  let offset = 0;
  if(index > 100) {
    offset = (index - Math.floor(index/100) * 100) * 50
  }else{
    offset = index * 50
  }
  return offset;
}

export default function NovelDetail({ navigation, route: { params:{ id, title, index } } }) {

  //一页100条
  const [ page, setPage ] = useState(1);   

  const { result, loading } = useFetch(novelDetail,[id]);  //数据

  const pickers = useRef();  //分页器数据      
  
  const list = useRef();

  const renderData = () => {
    return result.slice((page-1) *100,page * 100);
  }

  const renderItem = ({item}) => {
    return (
      <Chapter 
        bookName={title}
        title={item.chapter} 
        href={item.href} 
        index={item.index} 
        result={result} 
        id={id} 
        navigation={navigation}
      />
    );
  }
      
  const pageChange = (page) => setPage(page);

  useEffect(()=>{
    if(result) {
      let currentPage = Math.ceil(index/100);
      if(currentPage === 0) currentPage = 1;
      setPage(currentPage);
      requestAnimationFrame(()=>{
        let offset = getOffset(index);
        list.current.scrollToOffset({offset,animated:false});
      })
      let total = Math.ceil(result.length/100);
      pickers.current = [...Array(total).keys()].map(item => ({label:`第${item+1}页`,value:item+1}));
    }
  },[result]);

  useEffect(()=>{
    let flatlist = list.current;
    //第一次没有
    if(flatlist) {
      flatlist.scrollToOffset({offset:0,animated:false});
    }
  },[page]);

  return (
    <>
      {
        loading ?
        <Loading />:
        <FlatList 
          ref={list}
          data={renderData()}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          ListFooterComponent={<NovelPage pickers={pickers} page={page} pageChange={pageChange}/>}
        />
      }
    </>  
  );
}