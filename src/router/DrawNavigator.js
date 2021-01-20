import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawList from '../pages/DrawList/index';
import { DrawListOptions } from '../pages/DrawList/config/DrawListOptions';
import DrawTypeSelect from '../pages/DrawTypeSelect/index';
import { DrawTypeSelectOptions } from '../pages/DrawTypeSelect/config/DrawTypeSelectOptions';
import DrawRuleSetting from '../pages/DrwaRuleSetting/index';
import { DrawRuleSettingOptions } from '../pages/DrwaRuleSetting/config/DrawRuleSettingOptions';
import ColorSetting from '../pages/ColorSetting/index';
import { ColorSettingOptions } from '../pages/ColorSetting/config/ColorSettingOptions';
import RemoveAd from '../pages/RemoveAd/index';
import { RemoveAdOptions } from '../pages/RemoveAd/config/RemoveAdOptions';

const DrawStack = createStackNavigator();

//公用头部样式设置
const CommonOptions = {
  headerStatusBarHeight: 14,
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  // ...TransitionPresets.SlideFromRightIOS
};


export default function DrawNavigator() {
  return (
    <DrawStack.Navigator screenOptions={CommonOptions}>
      <DrawStack.Screen 
        name="DrawList"
        options={DrawListOptions}
        getComponent={()=> DrawList} 
      />
      <DrawStack.Screen 
        name="DrawTypeSelect"
        options={DrawTypeSelectOptions}
        getComponent={()=> DrawTypeSelect} 
      />
      <DrawStack.Screen 
        name="DrawRuleSetting"
        options={DrawRuleSettingOptions}
        getComponent={()=> DrawRuleSetting} 
      />
      <DrawStack.Screen 
        name="ColorSetting"
        options={ColorSettingOptions}
        getComponent={()=> ColorSetting} 
      />
      <DrawStack.Screen 
        name="RemoveAd"
        options={RemoveAdOptions}
        getComponent={()=> RemoveAd} 
      />
    </DrawStack.Navigator>
  );
}