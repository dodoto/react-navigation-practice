import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

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

  useEffect(()=>{
    SplashScreen.hide();
  },[]);

  let { result, loading } = useFetch(getAllJournal);

  if(loading) {
    return <Loading />
  }
  return (
    <View style={{flex:1}}>
      <FlatList 
        data={result}
        horizontal={true}
        pagingEnabled
        keyExtractor={keyExtractor}
        renderItem={renderJournalItem}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
      />
    </View>
  );
}

