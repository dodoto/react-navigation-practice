import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

// stack
export const JournalOpts = ({ navigation }) => ({
  title: '旧岛',
  headerLeft: () => (
    <Feather 
      name="menu" 
      color="#505050" 
      size={28}
      onPress={()=>{navigation.openDrawer()}} 
      style={{margin:20}}
    />
  ),
  headerRight: () => (
    <Feather 
      name="plus" 
      color="#505050" 
      size={28}
      onPress={()=>{navigation.navigate('DrawTypeSelect')}}
      style={{margin:20}}
    />
  )
});

//drawer
