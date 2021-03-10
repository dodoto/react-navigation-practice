import Cheerio from 'cheerio-without-node-native';

export function novelSearch(query,signal) {
  return new Promise((resolve,reject) => {
    let url = `https://www.mibaoge.com/search.php?q=${encodeURIComponent(query)}`;
    fetch(url,{method:'GET',signal})
    .then(res => res.text())
    .then(res => {
      let results = [];
      let $ = Cheerio.load(res);
      let imgs = $('.result-game-item-pic a img');
      // id 和 title
      let titles = $('.result-game-item-title-link');
      let descrs = $('.result-game-item-desc ');
      let authors = $('.result-game-item-info-tag:first-child span:last-child');
      imgs.each((index,item) => {
        let imgUrl = item['attribs']['src'];
        let { href:id, title } = titles[index]['attribs'];
        let descr = descrs[index]['children'][0]['data'];
        let author = authors[index]['children'][0]['data'];
        results.push({imgUrl,id,title,descr,author});
      })
      resolve(results);
    })
    .catch(err => reject(err));
  })
}

export function novelDetail(id,signal) {
  let url = `https://www.mibaoge.com${id}`;
  return new Promise((resolve,reject) => {
    fetch(url,{method:'GET',signal})
    .then(res => res.text())
    .then(res => {
      //只要章节
      let results = [];
      let $ = Cheerio.load(res);
      let chapters = $('dl dd a');
      chapters.each((index,item) => {
        let href = item['attribs']['href'];
        let chapter = item['children'][0]['data'];
        results.push({href,chapter});
      })
      resolve(results);
    })
    .catch(err => console.log(err))
  })
}

export function novelRead(href,signal) {
  let url = `https://www.mibaoge.com${href}`;
  return new Promise((resolve,reject) => {
    fetch(url,{method:'GET',signal})
    .then(res => res.text())
    .then(res => {
      //给第二参数,避免从dom转换html时中文被编码
      let $ = Cheerio.load(res,{decodeEntities: false});
      // let content = $('#content');
      // let results = content.html().replace(/<br>/g, "\n");
      //直接把片段交给webview
      let results = $('#content').html();
      resolve(results);
    })
    .catch(err => console.log(err))
  })
}