import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';

import BookItem from './BookItem';

export default function BookList({data,title,navigation}) {
  return (
    <FlatList 
      columnWrapperStyle={styles.container}
      numColumns={2}
      data={data}
      keyExtractor={(item,index) => item.id+''+index}
      renderItem={({item}) => <BookItem 
                                author={item.author} 
                                image={item.image} 
                                title={item.title} 
                                id={item.id} 
                                fav_nums={item.fav_nums}
                                navigation={navigation}
                              />}
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