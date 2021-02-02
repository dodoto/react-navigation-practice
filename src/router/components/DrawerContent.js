import React from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import Feather from 'react-native-vector-icons/Feather';

import { DrawerStyles } from '../config/Style';

export default function DrawerContent({navigation,state}) {
  // console.log(state);
  let jump = (routerName) => {
    if(state.route.name === routerName) {
      return
    };
    let isOpen = useIsDrawerOpen();
    if(!isOpen) {
      return
    }
    navigation.closeDrawer();
    InteractionManager.runAfterInteractions(()=>{
      navigation.navigate(routerName);
    });

  };

  return (
    <View style={DrawerStyles.container}>
      <Text style={DrawerStyles.img}>图片</Text>

      <TouchableOpacity activeOpacity={.6} onPress={()=>{jump('Home')}}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>期刊</Text>
          <Feather name="chevron-right" size={18} color="#505050" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.6} onPress={()=>{jump('RemoveAd')}}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>书籍</Text>
          <Feather name="chevron-right" size={18} color="#505050" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
