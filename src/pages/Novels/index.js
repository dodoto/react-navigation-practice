import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, InteractionManager, Keyboard } from 'react-native';

import { novelSearch } from '../../request/api/novels';
import { useAbortController } from '../../request/api/hook';
import { useEffect } from 'react/cjs/react.development';

// 小说搜索页 => 小说搜索结果页 => 小说详情页 => 小说阅读页

export default function Novels({navigation}) {

  const { abortController: { current: { signal } } } = useAbortController();

  const query = useRef();

  const [result,setResult] = useState([]);

  const search = () => {
    setTimeout(()=>{
      navigation.navigate('NovelSearch')
    },100)
    
    return
    novelSearch(query.current,signal)
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => console.log('over'))
  }

  const changeHandler = (text) => {
    query.current = text;
  };

  useEffect(()=>{

  },[])

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