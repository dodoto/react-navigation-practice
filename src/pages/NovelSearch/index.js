import React, { useCallback } from 'react';
import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// import * as ReAnimated from 'react-native-reanimated'
import Animated, { useValue } from 'react-native-reanimated';


import { keyExtractor } from '../../util/fun';
import { novelSearch } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import SearchItem from './component/SearchItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function NovelSearch({navigation, route:{ params: { keyword } } }) {

  const scrollY = useValue(0);

  const borderWidth = scrollY.interpolate({
    inputRange: [0,10],
    outputRange: [0,0.33],
    extrapolate: 'clamp'
  })

  const { loading, result } = useFetch(novelSearch,[keyword]);

  const close = () => {
    navigation.goBack();
  };

  const toNovelDetail = useCallback((params) => {
    navigation.navigate('NovelDetail',params);
  },[navigation])

  const renderItem = ({item:{title,author,id,imgUrl,descr}}) => {
    return (
      <SearchItem 
        bookName={title} 
        author={author} 
        id={id} 
        imgUrl={imgUrl} 
        descr={descr} 
        toDetail={toNovelDetail}
      />
    );
  }

  return (
    <>
      <Animated.View style={{borderBottomColor:'#DCDFE6',borderBottomWidth:borderWidth}}>
        <TouchableNativeFeedback
          onPress={close}
          background={TouchableNativeFeedback.Ripple('#909399',true,16)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground()}
        >
          <View style={{margin:10,alignSelf:'flex-end'}}>
            <Feather name="x" size={24}/>
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
      {
        loading ?
        <Loading />:
        <AnimatedFlatList
          data={result}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListEmptyComponent={<Text style={{textAlign:'center'}}>没有搜到你要的小说 (。・_・。)ﾉ </Text>}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
          )}
        />
      }
    </>
  );
}