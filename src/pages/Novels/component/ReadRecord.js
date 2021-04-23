import React, { memo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import NovelItem from '../../../components/NovelItem';

export default memo(function ReadRecord({
  author, 
  imgUrl, 
  descr, 
  id, 
  title, 
  index, 
  href,
  bookName, 
  onPress,
  remove
}) {

  const handler = () => {
    onPress(id,bookName,index,author,imgUrl,descr,title,href);
  }

  const removeHandler = () => {
    remove(id);
  }

  const removeTip = () => {
    Alert.alert(
      '删除记录',
      '确认是否删除该条记录',
      [
        {
          text: '取消',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: '确定',
          onPress: removeHandler,
          style: 'default'
        }
      ]
    )
  }

  return (
      <TouchableHighlight 
        onPress={handler} 
        underlayColor="#E4E7ED" 
        style={styles.card}
        onLongPress={removeTip}
      >
        <NovelItem 
          imgUrl={imgUrl}
          bookName={bookName}
          descr={descr}
          author={author}
          title={title}
          color={'#909399'}
        />
      </TouchableHighlight>
  );
})

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#DCDFE6',
  }
});
