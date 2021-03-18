import { useEffect, useState, useRef } from 'react';
import { ToastAndroid, DeviceEventEmitter } from 'react-native';
import Animated, { Easing, useValue } from 'react-native-reanimated';

export function useFetch (requestFun,params=[],deps = []) {
  const abortController = useRef(new AbortController());
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState()

  useEffect(() => {
    return () => abortController.current.abort()
  }, [])

  useEffect(() => {
    let message;
    requestFun(...params,abortController.current.signal)
      .then(res => setResult(res))
      .catch(err => {
        if(err.name !== 'AbortError') ToastAndroid.show(err,300);
        message = err.message;
      })
      .finally(() => {
        // 'Aborted'
        if(message !== 'Aborted') setLoading(false)
      })
  }, deps)

  return { result, loading, setLoading, abortController, setResult }
}

export function useAbortController() {
  const abortController = useRef(new AbortController());

  useEffect(() => {
    return () => abortController.current.abort()
  }, [])

  return { abortController }
}

//阅读页面 菜单动画 Hooks 封装

export function useReadMenuAnima(initValue,eventType) {

  //当前状态 0 close 1 open
  const state = useRef(0);

  //定义初始动画值
  const translate = useValue(initValue);  

  //定义动画函数
  const animate = (dest) => {
    Animated.timing(
      translate,
      {
        duration: 200,
        toValue: dest,
        easing: Easing.ease
      }
    ).start()
  }

  //监听阅读页面的点击事件
  useEffect(()=>{
    let current = initValue;
    let handler = () => {
      if(current === initValue) {
        current = 0;
        state.current = 1;
        animate(current);
      }else{
        current = initValue;
        state.current = 0;
        animate(current);
      }
    };
    DeviceEventEmitter.addListener(eventType,handler);
    return () => DeviceEventEmitter.removeAllListeners(eventType);
  },[])
  
  return { translate, state }
}

//阅读页面 监听换章节 Hooks 封装

export function useChapterTurn(callback) {
  useEffect(()=>{
    let listener = DeviceEventEmitter.addListener('chapterTurn',callback);
    return () => listener.remove();
  },[])
}

