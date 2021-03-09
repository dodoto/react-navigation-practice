import Cheerio from 'cheerio-without-node-native';

export function novelSearch(query,signal) {
  return new Promise((resolve,reject) => {
    let url = `https://so.biqusoso.com/s.php?ie=utf-8&siteid=biqiuge.com&q=${encodeURIComponent(query)}`;
    fetch(url,{method:'GET',signal})
    .then(res => res.text())
    .then(res => {
      let $ = Cheerio.load(res);
      let results = [];
      $('.search-list ul > li').each((index,item) => {
        //第一个是 序号 作品名称 作者
        if(index !== 0) {
          // 第3个和第5个是 作品名称 作者
          let children = item['children'];
          let title = children[3]['children'][0];
          let href = title['attribs']['href'];
          title = title['children'][0]['data'];
          let author = children[5]['children'][0]['data'];
          results.push({title,href,author});
        }
      });
      return resolve(results);
    })
    .catch(err => reject(err));
  })
}