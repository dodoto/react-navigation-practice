import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default memo(function BookItem({author,image,title,id,fav_nums,navigation}) {
  // console.log(title);
  let toBookDetail = () => {
    navigation.navigate('BookDetail',{title,id});
  };
  return (
    <TouchableOpacity onPress={toBookDetail} activeOpacity={.9}>
      <View style={styles.bookboard}>
        <Image 
          style={{width:120,height:180}}
          source={{uri:image}}
        />
        <View style={styles.txt}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
          <Text style={styles.author} numberOfLines={1} ellipsizeMode="tail">{author}</Text>
          {fav_nums && <Text style={styles.readnum}>{fav_nums}人看过</Text>}
        </View>
      </View>
    </TouchableOpacity>

  );
})

const styles = StyleSheet.create({
  bookboard: {
    width: 120,
    elevation: 3,
    marginBottom: 20,
    position: 'relative'
  },
  txt: {
    backgroundColor:'#fff',
    paddingHorizontal: 8,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  title: {
    color: '#606266',
    paddingTop: 4,
  },
  author: {
    color: '#C0C4CC',
    fontSize: 12,
    paddingVertical: 4
  },
  readnum: {
    textAlign: 'right',
    fontSize: 11,
    color: '#909399',
    paddingBottom: 6
  }
});
