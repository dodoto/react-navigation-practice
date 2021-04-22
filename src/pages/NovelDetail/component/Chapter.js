import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default memo(function Chapter({title,href,index,result,navigation,id,bookName,author, imgUrl, descr}) {

  const toNovelRead = () => {
    navigation.navigate('NovelRead',{href,title,result,index,id,bookName,author, imgUrl, descr})
  }

  return (
    <TouchableOpacity activeOpacity={.6} onPress={toNovelRead}>
      <Text 
        style={{
          height:50,
          lineHeight:50,
          fontSize:16,
          color: '#606266',
          borderBottomWidth: 1,
          marginHorizontal: 10,
          borderBottomColor: '#DCDFE6',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
})