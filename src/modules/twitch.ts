import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface TwitchState {
  connected: boolean;
}

const initialState: TwitchState = {
  connected: false,
};

export const twitchSlice = createSlice({
  name: 'twitch',
  initialState,
  reducers: {
    setServerState: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const { setServerState } = twitchSlice.actions;
export const selectTwitch = (state: RootState) => state.twitch;
export default twitchSlice.reducer;
