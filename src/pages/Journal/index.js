import React from 'react';
import { FlatList } from 'react-native';


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




