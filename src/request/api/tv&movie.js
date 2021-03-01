import Cheerio from 'cheerio-without-node-native';
// const baseURL = 'http://www.zimuxia.cn/我们的作品?cat=昆仑德语社&set=2';

/**
 * cat
 *  昆仑德语社
 *  欧美剧集
 *  欧美电影
 *  综艺纪录
 *  fix法语社
 *  fix韩语社
 *  fix日语社
 * 
 * set
 *  1 - pageNum
 * **/
// 返回数据和总页数
export function getTvAndMoVieList(cat,set,signal) {
  return new Promise((resolve,reject) => {
    let url = `http://www.zimuxia.cn/我们的作品?cat=${cat}&set=${set}`
    fetch(url,{method: 'GET',signal})
    .then(res => {
      return res.text()
    })
    .then(res => {
      let $ = Cheerio.load(res);
      let pgItems = $('.pg-item a');                      //详情链接 
      let imgs = $('.pg-img-wrapper img');                //图片
      let pageNum = $('.pg-pagination ul li').length;     //页码
      let cats = $('.pg-categories')                      //类别
      let data = [];
      pgItems.each((index,item) => {
        let { href } = item.attribs;
        let cat  = cats[index].children[0].data;
        let { alt:title, src:imgUrl } = imgs[index].attribs;
        data.push({title,imgUrl,href,cat});
      });
      resolve({pageNum,data})
    })
    .catch(err => reject(err))
  })
}

export function getTvAndMovieDetail(url,signal) {
  return new Promise((resolve,reject) => {
    // let url = `http://www.zimuxia.cn/portfolio/${name}`;
    fetch(url,{method: 'GET',signal})
    .then(res => res.text())
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}
