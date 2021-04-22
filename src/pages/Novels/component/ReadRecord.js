import React, { memo } from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

export default memo(function ReadRecord({
  author, 
  imgUrl, 
  descr, 
  id, 
  title, 
  index, 
  bookName, 
  onPress,
  remove
}) {

  const handler = () => {
    onPress(id,bookName,index,author,imgUrl,descr);
  }

  const removeHandler = () => {
    remove(id);
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
        <View style={{flexDirection:'row'}}>
          <FastImage
            source={{uri:imgUrl,priority: FastImage.priority.normal}}
            style={{width:100,height:150,borderRadius:10}}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{flex:1,paddingLeft:10,paddingVertical:10,justifyContent:'space-between'}}>
            <Text style={styles.bookName}>{bookName}</Text>
            <Text style={styles.author}>作者 {author}</Text>
            <Text style={styles.descr}>{descr}</Text>
            <Text style={styles.record}>阅读至{title}</Text>
          </View>

        </View>
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
  author: {
    color: 'green'
  },
  bookName: {
    fontSize: 16,
    color: '#808388'
  },
  descr: {
    color: '#909399',
    flex: 1
  },  
  record: {
    color: '#a0a4aa'
  },
});
