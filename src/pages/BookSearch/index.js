import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, ToastAndroid } from 'react-native';

import { getAllSearchBooks } from '../../request/api/book';
import { useAbortController } from '../../request/api/hook';
import BookList from '../../components/BookList';
import Loading from '../../components/Loading';
import { TestContext } from '../../context/TestContext';

export default function BookSearch({navigation}) {

  const input = useRef(null);

  const { abortController } = useAbortController();

  const [data,setData] = useState();

  const [loading,setLoading] = useState(false);

  const search = () => {
    setLoading(true);
    getAllSearchBooks(abortController.current.signal,value)
    .then(res => {
      if(res.length){
        setData(res);
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

  return (
    <TestContext.Provider value={{navigation}}>
      <View style={{flex:1}}>
        <View style={styles.searchbox}>
          <TextInput 
            autoFocus
            onChange={({nativeEvent}) => value = nativeEvent.text}
            ref={input}
            style={styles.searchinput}
            returnKeyType="search"
            placeholder="输入图书名称"
            onSubmitEditing={search}
          />
        </View>
        {
          loading ? 
          <Loading />:
          <BookList 
            title={data ? '搜索结果' : ''} 
            data={data} 
            navigation={navigation}
          />
        }
      </View>
    </TestContext.Provider>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    backgroundColor:'#fff',
    elevation: .3
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