
//小说阅读模块
import { 
  SETTHEME,
  SETFONTSIZE,
  SETCURRENTNOVEL,
  UPDATECURRENTNOVEL,
  RESETCURRENTNOVEL,
  SETCATALOG,
  SETBOOKSHELF,
  ADDBOOKSHELFITEM,
  REMOVEBOOKSHELFITEM,
  UPDATEBOOKSHELFITEM
} from './ActionTypes';

//包含 阅读样式 当前阅读小说信息 当前小说目录 收藏的小说信息列表
//拆分成 4 块 reducer

//样式
const initStyleState = {
  theme: 'default',
  fontSize: 'm'
};

export const ReaderStyleReducer = (state = initStyleState, {type, payload}) => {
  switch (type) {
    case SETTHEME:
      return {...state, theme: payload}
    case SETFONTSIZE:
      return {...state, fontSize: payload}
    default:
      return state
  }
}

//当前阅读小说信息,bookshelf里的子元素也是这个格式 
const  initCurrentNovelState = {                       
  author: '',          //作者
  imgUrl: '',          //封面
  descr: '',           //简介
  id: '',              //id
  title: '',           //标题
  index: '',           //页码
  bookName: '',        //书名
  href: ''             //当前章节地址
};

export const ReaderCurrentNovelReducer = (state = initCurrentNovelState, {type, payload}) => {
  switch (type) {
    case SETCURRENTNOVEL:
      return payload
    case UPDATECURRENTNOVEL:
      return {...state, ...payload}
    case RESETCURRENTNOVEL:
      return {...initCurrentNovelState}  
    default:
      return state
  }
}

//当前小说目录
const initCatalogState = [];

export const ReaderCatalogReducer = (state = initCatalogState, {type, payload}) => {
  switch (type) {
    case SETCATALOG:
      return payload
    default:
      return state
  }
}

//收藏小说列表
const initBookshelfState = [];

export const ReaderBookshelfReducer = (state = initBookshelfState, {type, payload}) => {
  switch (type) {
    case SETBOOKSHELF:
      return payload
    case ADDBOOKSHELFITEM:
      return [payload, ...state]
    case REMOVEBOOKSHELFITEM:
      return state.filter(item => item.id !== payload)
    case UPDATEBOOKSHELFITEM:
      return [payload,...(state.filter(item => item.id !== payload.id))]
    default:
      return state
  }
}

