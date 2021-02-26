import React from 'react';
import { FlatList } from 'react-native';

import TVandMovieItem from './TVandMovieItem';
import Pagination from './Pagination';
import { keyExtractor } from '../util/fun';

function renderTVandMovieItem({item:{imgUrl,title,cat,href}}) {
  return (
    <TVandMovieItem imgUrl={imgUrl} title={title} cat={cat} href={href}/>
  );
}

export default function TVandMovieList({data}) {
  return (
    <FlatList 
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderTVandMovieItem}
      ListFooterComponent={<Pagination />}
    />
  );
}