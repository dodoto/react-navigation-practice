import { combineReducers } from 'redux';
import ReaderModule from './module/ReaderModule/index';

// export default (state = {}, action) => ({
//   novelModule: novelReducer(state.novel, action)
// })
//上面的写法会导致 state一直都是初始值
export default combineReducers({
  ReaderModule
})

// store.dispach(action) ->  reducer(state,action) -> store.getState()