import React, { useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard, ToastAndroid } from 'react-native';

// 小说搜索页 => 小说搜索结果页(ok) => 小说详情页 => 小说阅读页

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

  return (
    <>
      <TextInput 
        autoFocus
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={search}
        onChangeText={changeHandler}
        placeholder="输入要搜索的小说名称"
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#ddd',
    marginHorizontal: 10,
    marginVertical: 20,
    paddingLeft: 6,
    borderRadius: 6
  }
});