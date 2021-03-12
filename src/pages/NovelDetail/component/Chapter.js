import React, { memo, useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { TestContext } from '../../../context/TestContext';

export default memo(function Chapter({title,href,index}) {

  const { navigation, result } = useContext(TestContext);

  const toNovelRead = () => {
    navigation.navigate('NovelRead',{href,title,result,index})
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