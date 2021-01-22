import { useEffect, useState } from 'react';

export function useFetch (requestFun,params=[],deps = []) {
  const abortController = new AbortController()
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState()

  useEffect(() => {
    requestFun(...params,abortController.signal)
      .then((res) => {
        setResult(res)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, deps)

  useEffect(() => {
    return () => abortController.abort()
  }, [])

  return { result, loading }
}