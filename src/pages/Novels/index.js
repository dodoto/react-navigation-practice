import { useFocusEffect } from '@react-navigation/core';
import React, { useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, ToastAndroid, StatusBar } from 'react-native';

import Bookshelf from './component/Bookshelf';

// 小说搜索页 => 小说搜索结果页(ok) => 小说详情页(分页目录)(ok) => 小说阅读页

export default function Novels({navigation}) {

  const query = useRef();

  const search = () => {
    let keyword = query.current ? query.current.trim() : '';
    if(keyword) {
      Keyboard.dismiss();
      setTimeout(()=>{
        navigation.navigate('NovelSearch',{keyword});
      },100)
    }else{
      ToastAndroid.show('请输入搜索的关键字',300);
    }
  };

  const changeHandler = (text) => {
    query.current = text;
  };

  const toNovelDetail = (id,title,index,author,imgUrl,descr) => {
    navigation.navigate('NovelDetail',{id,title,index,author,imgUrl,descr})
  };

  useFocusEffect(()=>{
    StatusBar.setBarStyle('dark-content')
  })

  return (
    <>
      <TextInput 
        // autoFocus
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={search}
        onChangeText={changeHandler}
        placeholder="输入要搜索的小说名称"
      />
      <View style={{flex:1,position:'relative'}}>
        <Bookshelf toNovelDetail={toNovelDetail}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    marginVertical: 20,
    height: 50,
    lineHeight: 50,
    paddingLeft: 6,
    borderRadius: 6
  }
});