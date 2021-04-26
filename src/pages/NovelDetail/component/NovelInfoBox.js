import React, { memo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NovelItem from '../../../components/NovelItem';
import { connect } from 'react-redux';

const mapState = state =>({
  info: state['ReaderModule']['ReaderCurrentNovelReducer']
});

export default connect(mapState)(memo(function NovelInfoBox({navigation,info}) {

  const {author, descr, title, imgUrl, href, bookName} = info;
  
  const toNovelRead = () => {
    if(href) {
      navigation.navigate('NovelRead',info);
    }
  }

  return (
    <>
      <NovelItem 
        imgUrl={imgUrl}
        bookName={bookName}
        author={author}
        descr={descr}
        title={title}
        toNovelRead={toNovelRead}
        color={'#79bbff'}
      />
      <Text style={styles.catalogHead}>目录</Text>
    </>
  );
}))

const styles = StyleSheet.create({
  catalogHead: {
    height: 40,
    paddingLeft:10,
    backgroundColor:'#DCDFE6',
    lineHeight: 40,
    color:'#303133'
  }
})