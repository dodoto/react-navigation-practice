import { GET, POST } from '../https';

//获取书籍
export function getBooks(signal) {
  let url = '/book/hot_list';
  return GET(url,signal)
}

//书籍搜索
export function searchBook(signal,q,start) {
  let url = `/book/search?q=${q}&start=${start}&summary=1`;
  return GET(url,signal)
}

//获取所有搜索结果
export function getAllSearchBooks(signal,q) {
  return new Promise((resolve,reject) => {
    let data = [];
    let start = 0;

    function loopGetSearchBooks(){
      return new Promise((resolve,reject) => {
        searchBook(signal,q,start)
        .then(res => {
          if(res.count === 20) {
            resolve(loopGetSearchBooks());
            data = data.concat(res.books);
            start += 20;
          }else{
            reject('over')
          }
        })
        .catch(err => reject(err))
      })
    }

    loopGetSearchBooks()
    .then(res => console.log(res))
    .catch(err => {
      if(err === 'over') {
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

//获取书籍详细信息
export function getBookDetail(id,signal) {
  let url = `/book/${id}/detail`;
  return GET(url,signal)
}

//获取书籍评论
export function getBookComment(book_id,signal) {
  let url = `/book/${book_id}/short_comment`;
  return GET(url,signal)
}

//评论书籍
export function postBookComment(params,signal) {
  //params = {book_id: int, content: string length=12}
  let url = '/book/add/short_comment';
  return POST(url,signal,params)
}