import React from 'react';
import { View, Text, TouchableOpacity, InteractionManager } from 'react-native';

import Feather from 'react-native-vector-icons/Feather';

import { DrawerStyles } from '../config/Style';

export default function DrawerContent({navigation}) {
  let jump = (routerName) => {
    navigation.closeDrawer();
    InteractionManager.runAfterInteractions(()=>{
      navigation.navigate(routerName);
    });
  }
  return (
    <View style={DrawerStyles.container}>
      <Text style={DrawerStyles.img}>图片</Text>

      <TouchableOpacity activeOpacity={.6}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>意见反馈</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.6}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>撰写评论</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.6}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>官方网站</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.6} onPress={()=> jump('RemoveAd')}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>移除广告</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={.6} onPress={() => jump('ColorSetting')}>
        <View style={DrawerStyles.btn}>
          <Text style={DrawerStyles.title}>色彩主体</Text>
          <Feather name="chevron-right" size={18} color="#fff" />
        </View>
      </TouchableOpacity>
      
      <Text style={DrawerStyles.version}>版本号:1.1.2(2880)</Text>
      <Text style={DrawerStyles.copyRight}>@2019-2020 Shrimp Studio. All rights reserved.</Text>
    </View>
  );
}
