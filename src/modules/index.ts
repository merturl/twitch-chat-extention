import { combineReducers, configureStore } from '@reduxjs/toolkit';
import twitch from './twitch';
import users from './users';
import channels from './channels';

const reducer = combineReducers({
  twitch,
  users,
  channels,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
