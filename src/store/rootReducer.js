import { combineReducers } from 'redux';
import novelReducer from "./module/novel/novelReducer";
import readerStyleReducer from './module/readerStyle/readerStyleReducer';

// export default (state = {}, action) => ({
//   novelModule: novelReducer(state.novel, action)
// })
//上面的写法会导致 state一直都是初始值
export default combineReducers({
  novelModule: novelReducer,
  readerStyleModule: readerStyleReducer
})

// store.dispach(action) ->  reducer(state,action) -> store.getState()