import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TransitionPresets } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import BookDetail from '../pages/BookDetail/index';
import { BookDetailStackOpts } from '../pages/BookDetail/config/BookDetailOpts';
import BookSearch from '../pages/BookSearch/index';
import CommentSend from '../pages/CommentSend/index';
import { CommentSendOpts } from '../pages/CommentSend/config/CommentSendOpts';
import TVandMovieDetail from '../pages/TVandMovieDetail/index';
import { TVandMovieDetailStackOpts } from '../pages/TVandMovieDetail/config/TVandMovieDetailOpts';
import FixSearch from '../pages/FixSearch/index';

const Stack = createStackNavigator();

//公用头部样式设置
const CommonOptions = {
  headerStatusBarHeight: 14,
  headerTintColor: '#505050',
  headerTitleAlign: 'center',
  ...TransitionPresets.SlideFromRightIOS
};


export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={CommonOptions} >
      <Stack.Screen 
        name="Drawer"
        options={{headerShown:false}}
        getComponent={()=> DrawerNavigator} 
      />
      <Stack.Screen 
        name="BookDetail"
        options={BookDetailStackOpts}
        getComponent={()=>BookDetail}
      />
      <Stack.Screen 
        name="BookSearch"
        options={{title:'搜索'}}
        getComponent={()=>BookSearch}
      />
      <Stack.Screen 
        name="CommentSend"
        options={CommentSendOpts}
        getComponent={()=> CommentSend} 
      />
      <Stack.Screen 
        name="TVandMovieDetail"
        options={TVandMovieDetailStackOpts}
        getComponent={() => TVandMovieDetail}
      />
      <Stack.Screen 
        name="FixSearch"
        options={TVandMovieDetailStackOpts}
        getComponent={() => FixSearch}
      />
    </Stack.Navigator>
  );
}