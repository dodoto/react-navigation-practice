import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

export const ColorSettingOptions = ({navigation}) => ({
  title: '色彩主体',
  headerStyle: {
    backgroundColor: '#ff3e68',
  },
  headerLeft: () => (
    <Feather 
      name="x" 
      color="#fff" 
      size={28}
      onPress={()=>{navigation.goBack()}}
      style={{margin:20}}
    />
  ),
  headerRight: () => (
    <Feather 
      name="check" 
      color="#fff" 
      size={28}
      onPress={()=>{console.log('confirm')}}
      style={{margin:20}}
    />
  ),
  ...TransitionPresets.ModalSlideFromBottomIOS
});
