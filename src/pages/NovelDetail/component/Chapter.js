import React, { memo } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default memo(function Chapter({title,index,href,toNovelRead}) {

  const press = () => {
    toNovelRead(title,href,index)
  }

  return (
    <TouchableOpacity activeOpacity={.6} onPress={press}>
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