import React, { memo, useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

import { W } from '../../../util/const';
import { TestContext } from '../../../context/TestContext';

export default memo(function TVandMovieItem({imgUrl,title,cat,href}) {

  const { navigation } = useContext(TestContext);

  const toDetail = () => {
    navigation.navigate('TVandMovieDetail',{href,title});
  }

  return (
      <TouchableNativeFeedback 
      onPress={toDetail}
      useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      <View style={styles.box}>
        <FastImage 
          style={styles.img}
          resizeMode={FastImage.resizeMode.contain}
          source={{uri:imgUrl,priority: FastImage.priority.normal,}} 
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.yellowLine}></Text>
        <Text style={styles.cat}>{cat}</Text>
        {/* <Text>{href}</Text> */}
      </View>
    </TouchableNativeFeedback>
  );
})

const styles = StyleSheet.create({
  box: {
    marginHorizontal: (W * 0.2) / 2,
    marginTop: 30,
    width:W*0.8,
  },
  img: {
    width: '100%',
    height:W*1.2,
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