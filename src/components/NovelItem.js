import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

export default function NovelItem({imgUrl,bookName,author,descr,title,toNovelRead,color}) {
  return (
    <View style={styles.box}>
      <FastImage
          source={{uri:imgUrl,priority: FastImage.priority.normal}}
          style={{width:100,height:150}}
          resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.text}>
        <Text>{bookName}</Text>
        <Text style={{color:'#909399'}}>{author}</Text>
        <Text style={{color:'#606266',flex:1}} ellipsizeMode="tail" numberOfLines={5}>{descr}</Text> 
        {title &&   <Text
            onPress={toNovelRead && toNovelRead} 
            style={{color}}
          >
            阅读至 {title}
          </Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection:'row',
    height: 170,
    padding: 10
  },
  text: {
    flex:1,
    padding:10,
    justifyContent:'space-between'
  }
});