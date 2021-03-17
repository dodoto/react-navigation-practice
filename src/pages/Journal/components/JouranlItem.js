import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

import { W } from '../../../util/const';

export default function JournalItem({image,content,title}) {
  
  return (
    <View style={{flex:1}}>
      <FastImage
        source={{uri:image,priority: FastImage.priority.normal}}
        style={{width:W,height:W*0.66}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.content}>{content}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '80%',
    flex: 1,
    marginVertical: 40,
    alignSelf: 'center',
    fontSize: 16,
    color: '#606266'
  },
  title: {
    marginBottom: 100,
    textAlign: 'center',
    backgroundColor:'#e0e0e0',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderRadius: 4,
    lineHeight: 40,
    width: '80%'
  }
});