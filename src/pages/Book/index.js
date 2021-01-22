import React, { useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

import BookItem from './components/BookItem'; 
import { useFetch } from '../../request/api/hook';
import { getBooks, searchBook } from '../../request/api/book';

export default function Book({navigation}) {

  const input = useRef(null);

  let {result,loading} = useFetch(getBooks);

  let searchBook = () => {
    console.log(input.current.value);
  };

  if(loading) {
    return null
  }  
  return (
    <View style={{flex:1}}>
      <View style={styles.searchbox}>
        <TextInput 
          ref={input}
          style={styles.searchinput}
          returnKeyType="search"
          placeholder="搜索图书名称"
          onSubmitEditing={searchBook}
        />
      </View>
      <FlatList 
        columnWrapperStyle={{justifyContent:'space-around'}}
        numColumns={2}
        data={result}
        keyExtractor={(item) => item.id+''}
        renderItem={({item}) => <BookItem 
                                  author={item.author} 
                                  image={item.image} 
                                  title={item.title} 
                                  id={item.id} 
                                  fav_nums={item.fav_nums}
                                  navigation={navigation}
                                />}
        ListHeaderComponent={<Text style={styles.title}>精选</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    backgroundColor:'#fff',elevation:4
  },
  searchinput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    marginHorizontal: 16,
    marginBottom: 10,
    height: 36,
    paddingLeft: 10
  },
  title: {
    fontSize:18,
    fontWeight:'normal',
    textAlign:'center',
    marginVertical: 20
  }
});