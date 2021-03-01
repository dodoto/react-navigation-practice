import React, { useRef } from 'react';
import { FlatList } from 'react-native';

import Loading from '../../components/Loading';
import TVandMovieItem from './components/TVandMovieItem';
import Pagination from './components/Pagination';
import { keyExtractor } from '../../util/fun';
import { useFetch } from '../../request/api/hook';
import { getTvAndMoVieList } from '../../request/api/tv&movie';
import { TestContext } from '../../context/TestContext';

//图片宽高比 1 : 1.5

function renderTVandMovieItem({item:{imgUrl,title,cat,href}}) {
  return (
    <TVandMovieItem imgUrl={imgUrl} title={title} cat={cat} href={href}/>
  );
}


export default function TVandMovie({route,navigation}) {

  const pageNo = useRef(1);

  const { result ,loading, abortController, setResult, setLoading  } = useFetch(getTvAndMoVieList,[route.name,1]);

  const changePage = (num) => {
    if(pageNo.current !== num && !loading) {
      setLoading(true);
      let message;
      pageNo.current = num
      getTvAndMoVieList(route.name,pageNo.current,abortController.current.signal)
      .then(res => setResult(res))
      .catch(err => {
        message = err.message;
        console.log(message);
      })
      .finally(() => {
        if(message !== 'Aborted') setLoading(false)
      })
    }
  }

  return (
    <>
      {
        loading ?
        <Loading /> :
        <TestContext.Provider value={{navigation}}>
          <FlatList 
            data={result.data}
            keyExtractor={keyExtractor}
            renderItem={renderTVandMovieItem}
            ListFooterComponent={<Pagination size={result.pageNum} changePage={changePage} current={pageNo.current}/>}
          />
        </TestContext.Provider>
      }
    </>
  );
}