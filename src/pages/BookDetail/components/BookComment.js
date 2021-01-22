import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useFetch } from '../../../request/api/hook';
import { getBookComment } from '../../../request/api/book';

const CommentItem = memo(function CommentItem({content,nums}) {
  return (
    <View style={styles.comment}>
      <Text style={styles.txt}>{content}</Text>
      <Text style={styles.num}>+{nums}</Text>
    </View>
  );
})

export default memo(function BookComment({book_id}) {
  let {result,loading} = useFetch(getBookComment,[book_id]);
  if(loading) {
    return <Text>没有评论</Text>
  }
  return (
    <View style={styles.box}>
      {
        result.comments.map(item => <CommentItem key={item.content} content={item.content} nums={item.nums}/>)
      }
    </View>
  );
})

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  comment: {
    backgroundColor:'#EBEEF5',
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 5,
    padding: 5,
    borderRadius: 5
  },
  txt: {
    marginRight: 4,
    color: '#909399'
  },
  num: {
    color: '#C0C4CC'
  }
});