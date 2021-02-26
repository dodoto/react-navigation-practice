import React, { memo } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { W } from '../../../util/const';

export default memo(function TVandMovieItem({imgUrl,title,cat,href}) {
  return (
    <View style={styles.box}>
      <Image source={{uri:imgUrl}} style={[{width:W*0.8,height:W*1.2},styles.img]}/>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.yellowLine}></Text>
      <Text style={styles.cat}>{cat}</Text>
      {/* <Text>{href}</Text> */}
    </View>
  );
})

const styles = StyleSheet.create({
  box: {
    marginTop: 30
  },
  img: {
    alignSelf: 'center'
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    lineHeight: 48,
  },
  yellowLine: {
    backgroundColor: '#fdd200',
    width: 70,
    height: 2,
    borderRadius: 10,
    alignSelf: 'center'
  },
  cat: {
    alignSelf: 'center',
    lineHeight: 48,
    fontSize: 12,
    color: '#b3b3b1'
  }
});