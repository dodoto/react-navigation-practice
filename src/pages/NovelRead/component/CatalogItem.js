import React, { memo, useContext } from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

import { TestContext } from '../../../context/TestContext';

export default memo(function CatalogItem({href,title}) {

  const { navigation, href:hrefRef, result } = useContext(TestContext);
  //不能跳转
  const toReadOtherChapter = () => {
    if(href !== hrefRef.current) {
      //通知父组件换页
      // navigation.navigate('NovelRead',{href,title,result})
    }
  };

  return (
    <TouchableHighlight onPress={toReadOtherChapter} underlayColor="#DCDFE6">
      <Text 
        style={[styles.title,href === hrefRef.current && styles.current]}
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
})

const styles = StyleSheet.create({
  title: {
    height: 40,
    lineHeight: 40,
    marginLeft: 10,
    color: '#606266',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DCDFE6',
  },
  current: {
    color: '#409EFF'
  }
});