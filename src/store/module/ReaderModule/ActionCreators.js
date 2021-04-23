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

/**
 * 
 * @param {String} theme 
 * @returns 
 */
export const setTheme = theme => ({type: SETTHEME, payload: theme});

/**
 * 
 * @param {String} size 
 * @returns 
 */
export const setFontSize = size => ({type: SETFONTSIZE, payload: size});

/**
 * 
 * @param {Object} novel 
 * @returns 
 */
export const setCurrentNovel = novel => ({type: SETCURRENTNOVEL, payload: novel});

/**
 * 
 * @param {String} title 
 * @param {Number} index
 * @param {String} href
 * @returns 
 */
export const updateCurrentNovel = (title,index,href) => ({type: UPDATECURRENTNOVEL, payload: {title,index,href}});

/**
 * 
 * @returns 
 */
export const resetCurrentNovel = () => ({type: RESETCURRENTNOVEL});

/**
 * 
 * @param {Array} catalog 
 * @returns 
 */
export const setCatalog = catalog => ({type: SETCATALOG, payload: catalog});

/**
 * 
 * @param {Array} novelList 
 * @returns 
 */
export const setBookshelf = novelList => ({type: SETBOOKSHELF, payload: novelList});

/**
 * 
 * @param {Object} novel 
 * @returns 
 */
export const addBookshelfItem = novel => ({type: ADDBOOKSHELFITEM, payload: novel});

/**
 * 
 * @param {String} novelId 
 * @returns 
 */
export const removeBookshelfItem = novelId => ({type: REMOVEBOOKSHELFITEM, payload: novelId});

/**
 * 
 * @param {Object} novel 
 * @returns 
 */
export const updateBookshelfItem = novel => ({type: UPDATEBOOKSHELFITEM, payload: novel});