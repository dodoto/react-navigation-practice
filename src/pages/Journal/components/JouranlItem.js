import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;

export default function JournalItem({image,content,title}) {
  
  return (
    <View style={{flex:1}}>
      <Image 
        source={{uri:image}}
        style={{width:WIDTH,height:WIDTH*0.66}}
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