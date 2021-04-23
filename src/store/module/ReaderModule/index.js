import { combineReducers } from 'redux';
import { 
  ReaderStyleReducer,
  ReaderCurrentNovelReducer,
  ReaderCatalogReducer,
  ReaderBookshelfReducer
} from './Reducers';

export default Reader = combineReducers({
  ReaderStyleReducer,
  ReaderCurrentNovelReducer,
  ReaderCatalogReducer,
  ReaderBookshelfReducer
});