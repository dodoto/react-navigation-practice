import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loading({style}) {

  const backgroundColor = style?.backgroundColor;
  const color = style?.color;
  
  return (
    <View style={{flex:1,justifyContent: "center",backgroundColor:backgroundColor || 'transparent'}}>
      <ActivityIndicator size="large" color={color || 'gray'}/>
    </View>
  );
}