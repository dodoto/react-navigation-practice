import React, { useContext, useState, useEffect } from 'react';
import { TouchableNativeFeedback, View, TextInput, Text } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import Animated, { Easing, useValue } from 'react-native-reanimated';

import { TestContext } from '../../context/TestContext';
import { W } from '../../util/const';

const AnimTextInput = Animated.createAnimatedComponent(TextInput);

function SearchInput({blurHandler}) {

  const { navigation } = useContext(TestContext);

  const width = useValue(0);

  const showAnim = Animated.timing(
    width,
    {
      duration: 200,
      toValue: W-30,
      easing: Easing.inOut(Easing.ease),
    }
  );

  const submitHandler = ({nativeEvent:{text}}) => {
    navigation.navigate('FixSearch',{text});
  }

  useEffect(()=>{
    showAnim.start()
  },[])

  return (
    <AnimTextInput 
      style={{width,backgroundColor:'#4f4f4f',color:'#efefef',borderRadius:50,marginHorizontal:16,paddingLeft:20}} 
      autoFocus
      placeholder="搜索..."
      placeholderTextColor="#afafaf"
      returnKeyType="search"
      onSubmitEditing={submitHandler}
      onBlur={blurHandler}
    />
  );
}


export default function DrawerRightBtn() {

  const [inputShow,setInputShow] = useState(false);
  
  const blurHandler = () => {
    setInputShow(false);
  }

  const pressHnadler = () => {
    requestAnimationFrame(()=>{
      setInputShow(!inputShow);
    });
  }

  return ( 
    inputShow ? 
    <SearchInput 
      blurHandler={blurHandler}
    />
    :
    <TouchableNativeFeedback 
      onPress={pressHnadler}
      background={TouchableNativeFeedback.Ripple('#fff',true,20)}
      useForeground={TouchableNativeFeedback.canUseNativeForeground()}
    >
      <View style={{flex:1,justifyContent:'center',marginHorizontal:14}}>
        <Feather name="search" color="#fff" size={20} />
      </View>
    </TouchableNativeFeedback>
  );
}
