import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import NovelItem from '../../../components/NovelItem';

export default function SearchItem({
  bookName,
  id,
  author,
  imgUrl,
  descr,
  toDetail,
}) {

  const pressHandler = () => {
    const params = {author,imgUrl,descr,id,bookName,index:-1,title:'',href:''};
    toDetail(params);
  }
  
  return (
    <TouchableNativeFeedback
      onPress={pressHandler}
      background={TouchableNativeFeedback.SelectableBackground()}
      useForeground={TouchableNativeFeedback.canUseNativeForeground()}
    >
      <View>
        <NovelItem 
          imgUrl={imgUrl}
          bookName={bookName}
          author={author}
          descr={descr}
        />
      </View>
    </TouchableNativeFeedback>
  );
}