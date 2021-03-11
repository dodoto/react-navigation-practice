import React, { useEffect, useState } from 'react';
import { StatusBar, DeviceEventEmitter } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { ScrollView as GesScrollView } from 'react-native-gesture-handler'

import Loading from '../../components/Loading';
import HeadMenu from './component/HeadMenu';
import FootMenu from './component/FootMenu';
import Catalog from './component/Catalog';
import { useFetch } from '../../request/api/hook';
import { novelRead } from '../../request/api/novels';


// 0 UNDETERMINED
// 1 FAILED
// 2 BEGAN
// 3 CANCELLED
// 4 ACTIVE
// 5 END

//使用 DeviceEventEmitter 进行组件通讯

export default function NovelRead({navigation,route:{params:{href,title,result:catalog}}}) {

  const { result, loading } = useFetch(novelRead,[href]);

  const stateChange= ({nativeEvent}) => {
    let { oldState, state } =nativeEvent;
    if(oldState === 2 && state === 5) {
      DeviceEventEmitter.emit('callMenu');
    }
  }

  return (
    <>
      <StatusBar hidden/>
      <HeadMenu title={title} navigation={navigation}/>
      {
        loading ?
        <Loading />:
        <GesScrollView style={{padding:20}}
          // onGestureEvent={({nativeEvent})=>console.log(nativeEvent)}
          onHandlerStateChange={stateChange}
        >
          <AutoHeightWebView
            source={{ html: result }}
            viewportContent={'width=device-width, user-scalable=no'}
          />
        </GesScrollView>
      }
      <FootMenu />
      <Catalog catalog={catalog} currentHref={href} navigation={navigation}/>
    </>
  );
}