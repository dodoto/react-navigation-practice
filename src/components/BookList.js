import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import BookItem from './BookItem';
import { keyExtractor } from '../util/fun';

function renderBookItem({item}) {
  return (
    <BookItem 
      author={item.author} 
      image={item.image} 
      title={item.title} 
      id={item.id} 
      fav_nums={item.fav_nums}
    />
  );
}

export default function BookList({data,title}) {
  return (
    <FlatList 
      columnWrapperStyle={styles.container}
      numColumns={2}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderBookItem}
      ListHeaderComponent={<Text style={styles.title}>{title}</Text>}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent:'space-between',
    paddingHorizontal:30
  },
  title: {
    fontSize:18,
    fontWeight:'normal',
    textAlign:'center',
    marginVertical: 20
  }
});