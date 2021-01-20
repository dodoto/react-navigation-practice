import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MenuStyles } from './config/Style';

// 0 数字 1 文字 2 多项奖品(数字) 3 多项奖品(文字)
export default function DrawTypeSelect(props) {
  let { navigation } =  props;
  let toDrawSetting = (type) => {
    navigation.replace('DrawRuleSetting',{type});
  };
  let back = () => navigation.goBack();
  return (
    <TouchableOpacity style={{flex:1}} activeOpacity={1} onPress={back}>
      <SafeAreaView style={MenuStyles.body}>
        <View style={MenuStyles.container}>
          <Text style={MenuStyles.title}>选择抽奖类型</Text>
          <TouchableOpacity activeOpacity={.8} onPress={()=>toDrawSetting(0)}>
            <Text style={MenuStyles.select}>数字</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} onPress={()=>toDrawSetting(1)}>
            <Text style={MenuStyles.select}>文字</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} onPress={()=>toDrawSetting(2)}>
            <Text style={MenuStyles.select}>多项奖品(数字)</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.8} onPress={()=>toDrawSetting(3)}>
            <Text style={MenuStyles.select}>多项奖品(文字)</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableOpacity>
  )
}