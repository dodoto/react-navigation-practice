import React from 'react';

import Feather from 'react-native-vector-icons/Feather';

export const DrawListOptions = ({ navigation }) => ({
  title: '抽奖活动清单',
  headerStyle: {
    backgroundColor: '#ff3e68',
  },
  headerLeft: () => (
    <Feather 
      name="menu" 
      color="#fff" 
      size={28}
      onPress={()=>{navigation.openDrawer()}} 
      style={{margin:20}}
    />
  ),
  headerRight: () => (
    <Feather 
      name="plus" 
      color="#fff" 
      size={28}
      onPress={()=>{navigation.navigate('DrawTypeSelect')}}
      style={{margin:20}}
    />
  )
});