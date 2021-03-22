import React, { memo } from 'react';
import { Alert, Text, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default memo(function ReadRecord({id,bookName,title,index,onPress,href,remove}) {

  const handler = () => {
    onPress(id,bookName,index)
  }

  const removeHandler = () => {
    console.log(href)
    remove(href)
  }

  const removeTip = () => {
    Alert.alert(
      '删除记录',
      '确认是否删除该条记录',
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: removeHandler,
          style: 'default'
        }
      ]
    )
  }

  return (
      <TouchableHighlight 
        onPress={handler} 
        underlayColor="#E4E7ED" 
        style={styles.card}
        onLongPress={removeTip}
      >
        <>
          <Text style={styles.bookName}>{bookName}</Text>
          <Text style={styles.record}>阅读至{title}</Text>
        </>
      </TouchableHighlight>
  );
})

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#DCDFE6',
    padding: 10
  },
  bookName: {
    fontSize: 16,
    color: '#808388'
  },
  record: {
    color: '#a0a4aa'
  },
});
