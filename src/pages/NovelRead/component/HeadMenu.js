import React, { memo, useContext } from 'react';
import { Text, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

import { useReadMenuAnima } from '../../../request/api/hook';
import { TestContext } from '../../../context/TestContext';

export default memo(function HeadMenu({title,navigation}) {

  const { theme } = useContext(TestContext);

  const { translate:translateY } = useReadMenuAnima(-60,'callMenu');

  const back = () => {
    navigation.goBack();
  };

  return (
    <Animated.View style={[styles.wrapper,theme,{transform:[{translateY}]}]}>
      <TouchableNativeFeedback 
        onPress={back}
        background={TouchableNativeFeedback.Ripple('#666',true,20)}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center'}}>
          <Feather name="arrow-left"  size={26} style={theme}/>
        </View>
      </TouchableNativeFeedback>
      <Text style={[styles.title,theme]}>{title}</Text>
      {/* <TouchableNativeFeedback 
        onPress={back}
        background={TouchableNativeFeedback.Ripple('#666',true,20)}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={{justifyContent:'center',position:'absolute',right:20,top:0,bottom:0}}>
          <Feather name="bookmark"  size={24} />
        </View>
      </TouchableNativeFeedback> */}
    </Animated.View>
  );
})

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 60,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 2
  },
  title: {
    marginLeft: 20
  }
});