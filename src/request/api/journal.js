import { GET } from '../https';

//获取最新期刊
export function getLatestJournal(signal) {
  let url = '/classic/latest';
  return GET(url,signal)
}

//获取下一期期刊
export function getNextJournal(index,signal) {
  console.log(index)
  let url = `/classic/${index}/next`;
  return GET(url,signal)
}

//获取前一期期刊
export function getPreviousJournal(index,signal) {
  let url = `/classic/${index}/previous`;
  return GET(url,signal)
}

//获取当前期刊的详细信息
export function getJournalDetail(type,id,signal) {
  let url = `/classic/${type}/${id}`;
  return GET(url,signal)
}

//获取当前期刊点赞数
export function getJournalLike(type,id,signal) {
  let url = `/classic/${type}/${id}/favor`;
  return GET(url,signal)
}

//获取我点赞的期刊
export function getMyLikeJournal(signal) {
  let url = '/classic/favor';
  return GET(url,signal)
}

//获取所有期刊
export function getAllJournal(signal) {
  return new Promise((resolve,reject) => {
    let data = [];     //保存期刊数据          
    let index = 0;     //当前期刊
  
    function autoGetPrevious() {
      return new Promise((resolve,reject) => {
        getPreviousJournal(data[index].index,signal)
        .then(res => {
          data.push(res);
          if(res.index !== 1){
            index++;
            resolve(autoGetPrevious())
          }else{
            reject('over')
          }
        })
        .catch(err => {
          reject(err);
        })
      })
    }
  
    //开始读取
    getLatestJournal(signal)
    .then(res => {
      data.push(res)
    })
    .then(res => autoGetPrevious())
    .catch(err => {
      if(err === 'over') {
        resolve(data)
      }else{
        reject(err)
      }
    })
  })

}