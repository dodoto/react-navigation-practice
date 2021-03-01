import React, { memo, useContext } from 'react';
import { View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native';

import { getTvAndMovieDetail } from '../../../request/api/tv&movie';
import { useAbortController } from '../../../request/api/hook';
import { W } from '../../../util/const';
import { TestContext } from '../../../context/TestContext'

export default memo(function TVandMovieItem({imgUrl,title,cat,href}) {

  // const { abortController: {current} } = useAbortController();

  const { navigation } = useContext(TestContext);

  const toDetail = () => {
    // getTvAndMovieDetail(href,current.signal)
    // .then(res => {
    //   console.log(res)
    //   //title 
    // })
    // .catch(err => console.log(err))
    navigation.navigate('TVandMovieDetail',{href,title});
  }

  return (
    <View style={styles.box}>
      <Image source={{uri:imgUrl}} style={styles.img}/>
      <TouchableHighlight onPress={toDetail} underlayColor="#ffde3d">
        <Text style={styles.title}>{title}</Text>
      </TouchableHighlight>
      <Text style={styles.yellowLine}></Text>
      <Text style={styles.cat}>{cat}</Text>
      {/* <Text>{href}</Text> */}
    </View>
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