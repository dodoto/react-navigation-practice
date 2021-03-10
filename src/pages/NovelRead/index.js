import React, { useEffect, useState, memo } from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { ScrollView as GesScrollView } from 'react-native-gesture-handler'

import Loading from '../../components/Loading';
import { useFetch } from '../../request/api/hook';
import { novelRead } from '../../request/api/novels';


// 0 UNDETERMINED
// 1 FAILED
// 2 BEGAN
// 3 CANCELLED
// 4 ACTIVE
// 5 END

const Top = memo(function TopMenu() {
  return (
    <View style={{height:40,backgroundColor:'skyblue'}}>
      <Text>我是上面</Text>
    </View>
  );
})

const Bottom = memo(function BottomMenu() {
  return (
    <View style={{height:40,backgroundColor:'skyblue'}}>
      <Text>我是下面</Text>
    </View>
  );
})

export default function NovelRead({navigation,route:{params:{href}}}) {

  const { result, loading } = useFetch(novelRead,[href]);

  const [menuShow,setMenuShow] = useState(false);

  const stateChange= ({nativeEvent}) => {
    let { oldState, state } =nativeEvent;
    if(oldState === 2 && state === 5) {
      setMenuShow(!menuShow);
      console.log('这是一次点击,操作菜单')
    }
  }

  return (
    <>
      <StatusBar hidden/>
      <Top />
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
      <Bottom />
    </>
  );
}