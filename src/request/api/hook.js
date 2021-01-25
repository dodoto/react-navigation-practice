import { useEffect, useState, useRef } from 'react';

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
        console.log('err',requestFun,err)
        message = err.message;
      })
      .finally((res) => {
        // 'Aborted'
        if(message !== 'Aborted') setLoading(false)
      })
  }, deps)

  return { result, loading, setLoading, abortController }
}

export function useAbortController() {
  const abortController = useRef(new AbortController());

  useEffect(() => {
    return () => abortController.current.abort()
  }, [])

  return { abortController }
}
