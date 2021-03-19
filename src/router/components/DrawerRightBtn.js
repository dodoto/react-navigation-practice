import React, { useContext, useState, useEffect, useRef } from 'react';
import { TouchableNativeFeedback, View, TextInput, StyleSheet, Keyboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Animated, { Easing, useValue } from 'react-native-reanimated';

import { TestContext } from '../../context/TestContext';
import { W } from '../../util/const';
import { useBackHandler } from '../../request/api/hook';

export default function DrawerRightBtn() {

  const { navigation } = useContext(TestContext);

  const [inputShow,setInputShow] = useState(false);

  const width = useValue(0);

  const input = useRef();

  const opacity = width.interpolate({
    inputRange: [0,W-10],
    outputRange: [0,1],
    extrapolate: 'clamp'
  });

  const submitHandler = ({nativeEvent:{text}}) => {
    setInputShow(false);
    navigation.navigate('FixSearch',{text});
  }
  
  const blurHandler = () => {
    setInputShow(false);
  }

  const pressHnadler = () => {
    setInputShow(!inputShow)
  }

  const animation = (dest) => {
    Animated.timing(
      width,
      {
        duration: 200,
        toValue: dest,
        easing: Easing.inOut(Easing.ease),
      }
    ).start()
  }

  useEffect(()=>{
    if(inputShow) {
      animation(W-10)
      input.current.focus()
    }else{
      animation(0)
      Keyboard.dismiss()
      input.current.clear()
    }
  },[inputShow])

  return ( 
    <>
      <Animated.View style={[styles.input,{width,opacity}]}>
        <TextInput 
          ref={input}
          style={{color:'#efefef'}}
          placeholder="搜索..."
          placeholderTextColor="#afafaf"
          returnKeyType="search"
          onSubmitEditing={submitHandler}
          onBlur={blurHandler}
        />
      </Animated.View>

      <TouchableNativeFeedback 
        onPress={pressHnadler}
        background={TouchableNativeFeedback.Ripple('#fff',true,20)}
        useForeground={TouchableNativeFeedback.canUseNativeForeground()}
      >
        <View style={styles.btn}>
          <Feather name={inputShow ? 'x' : "search"} color="#fff" size={20} />
        </View>
      </TouchableNativeFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor:'#4f4f4f',
    borderRadius:50,
    marginHorizontal:5,
    paddingLeft:10
  },
  btn: {
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    top:0,right:0,bottom:0,
    width: 50,
  }
});
