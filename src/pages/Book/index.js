import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ToastAndroid, BackHandler } from 'react-native';

import BookItem from './components/BookItem'; 
import { useFetch } from '../../request/api/hook';
import { getBooks, searchBook } from '../../request/api/book';
import Loading from '../../components/Loading';

export default function Book({navigation,route}) {

  const input = useRef(null);

  const {result,loading,setLoading,abortController} = useFetch(getBooks);

  const [data,setData] = useState();

  const backHandler = () => {
    if(route.name === 'Book' && navigation.isFocused()) {
      if(!data) {
        return false
      }else{
        setData(null);
        return true
      }
    }else{
      return false
    }
  };

  const search = () => {
    setLoading(true);
    searchBook(abortController.current.signal,value)
    .then(res => {
      if(res.books.length){
        setData(res.books);
      }else{
        ToastAndroid.show('没有搜索到相关书籍',500);
      };
    })
    .catch(err => {
      console.log(err);
      ToastAndroid.show('发生错误',500);
    })
    .finally(()=>{
      setLoading(false);
      input.current.clear();
    })
  };

  let value = '';

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress',backHandler);
    return () => BackHandler.removeEventListener('hardwareBackPress',backHandler)
  },[data]);

  return (
    <View style={{flex:1}}>
      <View style={styles.searchbox}>
        <TextInput 
          onChange={({nativeEvent}) => value = nativeEvent.text}
          ref={input}
          style={styles.searchinput}
          returnKeyType="search"
          placeholder="搜索图书名称"
          onSubmitEditing={search}
        />
      </View>
      {
        loading ?
        <Loading /> :
        <FlatList 
        columnWrapperStyle={{justifyContent:'space-around'}}
        numColumns={2}
        data={data || result}
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
      }
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