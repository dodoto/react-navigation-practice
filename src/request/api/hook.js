import { useEffect, useState, useRef } from 'react';
import { ToastAndroid } from 'react-native';

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

