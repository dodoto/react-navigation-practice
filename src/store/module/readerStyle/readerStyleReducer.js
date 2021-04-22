import readerStyleActionTypes from './readerSteyleActionTypes';

const { SETFONTSIZE, SETTHEME } = readerStyleActionTypes;

const defaultState = {
  fontSize: 's',
  theme: 'default'
}

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SETFONTSIZE:      
      return {...state,fontSize: payload}
    case SETTHEME:
      return {...state,theme: payload}
    default:
      return state
  }
}
