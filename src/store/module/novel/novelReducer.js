// 小说模块 reducer 包含 收藏列表 当前阅读小说的(目录 简介 封面)
import novelActionTypes from './novelActionTypes';

const { ADDNOVEL, REMOVENOVEL, SETNOVELS, UPDATENOVELS } = novelActionTypes;

// const initialState = []

export default (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADDNOVEL:
      return [payload,...state]
    case REMOVENOVEL: 
      return state.filter(item => item.id !== payload)
    case SETNOVELS:
      return payload
    case UPDATENOVELS:
      return [payload,...(state.filter(item => item.id !== payload.id))]
    default:
      return state
  }
}