import React, { useContext, useMemo, memo } from 'react';
import { TouchableHighlight, Text, StyleSheet, DeviceEventEmitter } from 'react-native';

import { TestContext } from '../../../context/TestContext';

const CatalogItem = memo(function ({href,title,index,isCurrent}) {

  const toReadOtherChapter = () => {
    if(!isCurrent) {
      DeviceEventEmitter.emit('callCatalog'); //关闭
      DeviceEventEmitter.emit('chapterTurn',{href,title,index,hidde:false}); //换章
    }
  };
  // console.log('render',index);
  return (
    <TouchableHighlight onPress={toReadOtherChapter} underlayColor="#DCDFE6">
      <Text 
        style={[styles.title,isCurrent && styles.current]}
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

export default function MemoCatalogItem ({href,title,index,}) {

  const { currentIndex } = useContext(TestContext);

  const isCurrent = useMemo(()=> {
    // console.log('当前',index);
    // console.log('选中',currentIndex);
    // console.log('状态',isCurrent);
    return currentIndex === index;
  },[index,currentIndex]);

  return <CatalogItem href={href} title={title} index={index} isCurrent={isCurrent} />;
} 

//思路 
//先用useMemo建立一层计算状态的组件
//再用memo建一层实际渲染的组件
//每次currentIndex改变,重新计算状态
//memo判断状态是否发生改变

