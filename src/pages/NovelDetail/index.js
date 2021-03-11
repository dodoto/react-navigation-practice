import React, { useEffect, useRef, useState } from 'react';
import { FlatList, } from 'react-native';

import { novelDetail } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import { keyExtractor } from '../../util/fun';
import Chapter from './component/Chapter';
import NovelPage from './component/NovelPage';
import { TestContext } from '../../context/TestContext';

function renderItem({item}) {
  return (
    <Chapter title={item.chapter} href={item.href}/>
  );
}

function getItemLayout(data,index) {
  return {
    length: 50, offset: 50 * index, index
  }
}

export default function NovelDetail({ navigation, route: { params:{ id } } }) {

  //一页100条
  const [ page, setPage ] = useState(1);   

  const { result, loading } = useFetch(novelDetail,[id]);  //数据

  const pickers = useRef();  //分页器数据      
  
  const list = useRef();

  const renderData = () => {
    return result.slice((page-1) *100,page * 100);
  }

  const pageChange = (page) => setPage(page);

  useEffect(()=>{
    if(result) {
      let total = Math.ceil(result.length/100);
      pickers.current = [...Array(total).keys()].map(item => ({label:`第${item+1}页`,value:item+1}));
    }
  },[result]);

  useEffect(()=>{
    let flatlist = list.current;
    //第一次没有
    if(flatlist)flatlist.scrollToOffset({offset:0,animated:false});
  },[page]);

  return (
    <TestContext.Provider value={{navigation,result}}>
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
    </TestContext.Provider>
  );
}