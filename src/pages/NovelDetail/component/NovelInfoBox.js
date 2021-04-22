import React, { memo, useEffect, useState } from 'react';
import { Text, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

const mapState = state =>({
  records: state['novelModule']
});

export default connect(mapState)(memo(function NovelInfoBox({records,author,imgUrl,descr,id,navigation, result}) {
  
  const [currentRecord,setCurrentRecord] = useState()
  
  useEffect(() => {
    const current = (records.filter(item => item.id === id))[0];
    if(current) setCurrentRecord(current);
    const listener = DeviceEventEmitter.addListener('updateCurrentRecord',(record) => {
      setCurrentRecord(record);
    });
    return () => listener.remove();
  },[])

  const toNovelRead = () => {
    if(currentRecord) {
      currentRecord.result = result;
      navigation.navigate('NovelRead',currentRecord);
    }
  }

  return (
    <>
      <View style={styles.box}>
        <FastImage
          source={{uri:imgUrl,priority: FastImage.priority.normal}}
          style={{width:100,height:150}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{flex:1,padding:10,justifyContent:'space-between'}}>
          <Text style={{color:'#909399'}}>{author}</Text>
          <Text style={{color:'#606266',flex:1}} ellipsizeMode="tail" numberOfLines={7}>{descr}</Text>
          <Text
            onPress={toNovelRead} 
            style={{color: currentRecord ? '#79bbff' :'transparent'}}
          >
            阅读至{currentRecord?.title}
          </Text>
        </View>
      </View>
      <Text style={styles.catalogHead}>目录</Text>
    </>
  );
}))

const styles = StyleSheet.create({
  box: {
    flexDirection:'row',
    height: 170,
    padding: 10
  },
  catalogHead: {
    flex:1,
    paddingLeft:10,
    backgroundColor:'#DCDFE6',
    lineHeight: 40,
    color:'#303133'
  }
})