import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loading({color}) {

  return (
    <View style={{flex:1,justifyContent: "center"}}>
      <ActivityIndicator size="large" color={color || "gray"}/>
    </View>
  );
}