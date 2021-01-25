import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useFetch } from '../../request/api/hook';
import { getBooks } from '../../request/api/book';
import BookList from './components/BookList';
import Loading from '../../components/Loading';

export default function Book({navigation,route}) {

  const {result,loading} = useFetch(getBooks);

  const toSearch = () => navigation.navigate('BookSearch');

  return (
    <View style={{flex:1}}>
      <View style={styles.searchbox}>
        <Text style={styles.searchbtn} onPress={toSearch}>搜索</Text>
      </View>
      {
        loading ?
        <Loading /> :
        <BookList data={result} title={'精选'} navigation={navigation}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    backgroundColor:'#fff',elevation:4
  },
  searchbtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    marginHorizontal: 16,
    marginBottom: 10,
    height: 36,
    lineHeight: 36,
    textAlign: 'center',
    color: '#909399'
  },
  searchinput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
    marginHorizontal: 16,
    marginBottom: 10,
    height: 36,
    paddingLeft: 10
  }
});