import novelActionTypes from './novelActionTypes';

const { ADDNOVEL, REMOVENOVEL, SETNOVELS, UPDATENOVELS } = novelActionTypes;

/**
 * 
 * @param {Object} novel
 * 
 */
export function addNovel(novel) {
  return {
    type: ADDNOVEL,
    payload: novel
  }
}

/**
 * 
 * @param {String} href
 * @returns 
 */
export function removeNovel(href) {
  return {
    type: REMOVENOVEL,
    payload: href
  }
}

/**
 * 
 * @param {Array} novels 
 * @returns 
 */
export function setNovels(novels) {
  return {
    type: SETNOVELS,
    payload: novels
  }
}

/**
 * 
 * @param {Object} novel 
 */
export function updateNovels(novel) {
  return {
    type: UPDATENOVELS,
    payload: novel
  }
}




