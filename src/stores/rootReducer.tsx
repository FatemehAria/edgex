import { combineReducers } from '@reduxjs/toolkit';

import filesReducer from './files.store';
import globalReducer from './global.store';
import tagsViewReducer from './tags-view.store';
import userReducer from './user.store';

const rootReducer = combineReducers({
  user: userReducer,
  tagsView: tagsViewReducer,
  global: globalReducer,
  files: filesReducer,
});

export default rootReducer;
