import React from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

// 1: 1.5
export default function NovelItem({title,id,author,imgUrl,descr,navigation}) {

  const toNovelDetail = () => {
    navigation.navigate('NovelDetail',{author,imgUrl,descr,id,title,index:0})
  };

  return (
    <TouchableNativeFeedback
      onPress={toNovelDetail}
      background={TouchableNativeFeedback.SelectableBackground()}
      useForeground={TouchableNativeFeedback.canUseNativeForeground()}
    >
      <View
        style={{
          flexDirection:'row',
          borderBottomColor:'#E4E7ED',
          borderBottomWidth:0.33,
          padding: 10,
          justifyContent: 'space-between'
        }}
      >
        <FastImage
          source={{uri:imgUrl,priority: FastImage.priority.normal}}
          style={{width:100,height:150}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{paddingLeft:10,paddingVertical:10,flex:1,overflow:'hidden'}}>
          <Text style={{color:'#303133',fontSize: 16}}>{title}</Text>
          <Text style={{color:'#909399',marginVertical:5}}>{author}</Text>
          <Text style={{color:'#606266'}} ellipsizeMode="tail" numberOfLines={5}>{descr}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}