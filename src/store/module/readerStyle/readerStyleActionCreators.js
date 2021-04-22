import readerStyleActionTypes from './readerSteyleActionTypes';

const { SETFONTSIZE, SETTHEME } = readerStyleActionTypes;

/**
 * 
 * @param {String} size 
 * @returns 
 */
export function setFontSize(size) {
  return {
    type: SETFONTSIZE,
    payload: size
  }
}

/**
 * 
 * @param {String} theme 
 * @returns 
 */
export function setTheme(theme) {
  return {
    type: SETTHEME,
    payload: theme
  }
}