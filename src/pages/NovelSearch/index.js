import React from 'react';
import { View, Text, FlatList, TouchableNativeFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

// import * as ReAnimated from 'react-native-reanimated'
import Animated, { useValue } from 'react-native-reanimated';


import { keyExtractor } from '../../util/fun';
import { novelSearch } from '../../request/api/novels';
import { useFetch } from '../../request/api/hook';
import Loading from '../../components/Loading';
import NovelItem from './component/NovelItem';
import { TestContext } from '../../context/TestContext';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function renderItem({item:{title,author,id,imgUrl,descr}}) {
  return (
    <NovelItem title={title} author={author} id={id} imgUrl={imgUrl} descr={descr}/>
  );
}

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

  return (
    <TestContext.Provider value={{navigation}}>
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
    </TestContext.Provider>
  );
}