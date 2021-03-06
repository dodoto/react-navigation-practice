import React, { memo } from 'react';
import { TouchableHighlight, Text, StyleSheet, DeviceEventEmitter } from 'react-native';

export default memo(function CatalogItem({href,title,index,isCurrent}) {

  const toReadOtherChapter = () => {
    if(!isCurrent) {
      DeviceEventEmitter.emit('callCatalog'); //关闭
      requestAnimationFrame(()=>{
        DeviceEventEmitter.emit('chapterTurn',{href,title,index,hidde:false}); //换章
      });
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


