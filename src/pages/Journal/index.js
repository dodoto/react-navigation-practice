import React from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';

import Loading from '../../components/Loading';
import JournalItem from './components/JouranlItem';
import { keyExtractor } from '../../util/fun';
import { getAllJournal } from '../../request/api/journal';
import { useFetch } from '../../request/api/hook';

function renderJournalItem({item}) {
  return (
    <JournalItem 
      image={item.image}
      content={item.content}
      title={item.title}
    />
  );
}

export default function Journal() {

  let { result, loading } = useFetch(getAllJournal);

  useFocusEffect(()=>{
    StatusBar.setBarStyle('dark-content')
  })

  if(loading) {
    return <Loading />
  }
  return (
    <FlatList 
      data={result}
      horizontal={true}
      pagingEnabled
      keyExtractor={keyExtractor}
      renderItem={renderJournalItem}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={1}
    />
  );
}







