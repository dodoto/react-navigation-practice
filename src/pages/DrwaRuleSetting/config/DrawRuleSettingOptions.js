import React from 'react';

import { TransitionPresets } from '@react-navigation/stack';
import Feather from 'react-native-vector-icons/Feather';

export const DrawRuleSettingOptions = ({navigation}) => ({
  title: '抽奖设定',
  headerStyle: {
    backgroundColor: '#404244',
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
  ...TransitionPresets.ModalSlideFromBottomIOS
});