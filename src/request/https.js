/****
 *
 *
 * config: {
 *      method: 'POST' || 'GET',
 *      credentials: 'same-origin', // include, same-origin, *omit
 *      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
 *      body: params,      // must match 'Content-Type' header
 *      headers: {
 *           'user-agent': 'Mozilla/4.0 MDN Example',
 *           'content-type': 'application/json'
 *      },
 *      mode: 'cors', // no-cors, cors, *same-origin
 *      redirect: 'follow', // manual, *follow, error
 *      referrer: 'no-referrer', // *client, no-referrer
 * }
 *
 *
 * ****/
const headers = { appkey: 'Ct9d2WkCAIytagLB' };

const baseURL = 'http://bl.talelin.com/v1';

function promiseHandler(url,config) {
  return new Promise((resolve, reject) => {
      fetch(url,config).then(res => {
          switch (res.status) {
              case 200:
                  //请求成功
                  resolve(res.json());
                  break;
              case 201:
                  //创建成功
                  resolve(res.json());
                  break; 
              case 202:
                  //更新成功
                  resolve(res.json());
                  break; 
              case 204:
                  //删除成功
                  resolve(res.json());
                  break; 
              case 301:  
                  //永久重定向 
                  resolve(res.json());
                  break;  
              case 400: 
                  //请求包含不支持的参数
                  reject(res.status)
                  break;            
              case 401:
                  //未授权
                  reject(res.status)
                  break;
              case 403:
                  //被禁止访问
                  reject(res.status)
                  break;
              case 404:
                  //请求的资源不存在
                  reject(res.status)
                  break;
              case 413:  
                  //上传的File体积太大  
                  reject(res.status)
                  break;
              default :
                  console.log(res.status);
                  reject(res)
                  break;
          }
      }).catch(err => {
          reject(err)
      })
  })
}

export function POST(url, data = {}) {
  let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
  let config = {method: 'POST', body: qs.stringify(data), headers};
  return promiseHandler(url, config);
}

export function GET(url,signal) {
  url = baseURL + url;
  let config = {
      method: 'GET',
      headers,
      signal
  };
  return promiseHandler(url,config);
}

