import React from 'react';
import { Text, View, ScrollView, StyleSheet, Button } from 'react-native';
import FastImage from 'react-native-fast-image';

import { useFetch } from '../../request/api/hook';
import { getBookDetail } from '../../request/api/book';
import BookComment from './components/BookComment';
import Loading from '../../components/Loading';

export default function BookDetail({route,navigation}) {
  
  let { result ,loading } = useFetch(getBookDetail,[route.params.id]);

  let toCommentSend = () => {
    navigation.navigate('CommentSend',{id:route.params.id});
  };

  if(loading) {
    return <Loading />
  }  
  return (
    <View style={{flex:1}}>
      <ScrollView>
        <View style={[styles.section,styles.mb]}>
          <View style={{elevation:4}}>
            <FastImage 
              style={{width:120,height:180}} 
              source={{uri:result.image,priority: FastImage.priority.normal,}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Text style={styles.title}>{result.title}</Text>
          <Text style={styles.author}>{result.author}</Text>
        </View>

        <View style={[styles.section,styles.mb]}>
          <Text style={styles.sectiontitle} >短评</Text>
          <BookComment book_id={result.id}/>
        </View>

        <View style={[styles.section,styles.mb]}>
          <Text style={styles.sectiontitle}>内容简介</Text>
          <Text style={styles.summary}>&nbsp;&nbsp;&nbsp;&nbsp;{result.summary}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectiontitle}>书本信息</Text>
          <View style={styles.inforow}>
            <Text style={styles.inforowtitle}>出版社</Text>
            <Text style={styles.info}>{result.publisher}</Text>
          </View>
          <View style={styles.inforow}>
            <Text style={styles.inforowtitle}>出版日期</Text>
            <Text style={styles.info}>{result.pubdate}</Text>
          </View>
          <View style={styles.inforow}>
            <Text style={styles.inforowtitle}>页数</Text>
            <Text style={styles.info}>{result.pages}</Text>
          </View>
          <View style={styles.inforow}>
            <Text style={styles.inforowtitle}>定价</Text>
            <Text style={styles.info}>{result.price}</Text>
          </View>
          <View style={styles.inforow}>
            <Text style={styles.inforowtitle}>装帧</Text>
            <Text style={styles.info}>{result.binding}</Text>
          </View>
        </View>
      </ScrollView>
      <Button title="评论" onPress={toCommentSend} color="#409EFF"/>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20
  },
  mb: {
    marginBottom: 20
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10
  },
  author: {
    color: '#909399',
  },
  sectiontitle: {
    marginVertical: 5,
    fontWeight: '700',
  },
  summary: {
    marginHorizontal: 10,
    color: '#606266',
    letterSpacing: 1
  },
  inforow: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 2
  },
  inforowtitle: {
    width: 80,
    marginLeft: 10,
    color: '#C0C4CC'
  },
  info: {
    color: '#909399'
  }
});