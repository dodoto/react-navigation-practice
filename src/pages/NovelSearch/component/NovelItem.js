import React, { useContext } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

import { TestContext } from '../../../context/TestContext';

// 1: 1.5
export default function NovelItem({title,id,author,imgUrl,descr}) {

  const { navigation } = useContext(TestContext);

  const toNovelDetail = () => {
    navigation.navigate('NovelDetail',{id,title})
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
          padding: 15,
          justifyContent: 'space-between'
        }}
      >
        <FastImage
          source={{uri:imgUrl,priority: FastImage.priority.normal}}
          style={{width:100,height:150}}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={{marginLeft:15,flex:1,maxHeight:150,overflow:'hidden'}}>
          <Text style={{color:'#303133',fontSize: 16}}>{title}</Text>
          <Text style={{color:'#909399',marginVertical:5}}>{author}</Text>
          <Text style={{color:'#606266'}} ellipsizeMode="tail" numberOfLines={6}>{descr}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}