import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ChannelsState {
  channels: Channel[];
  init: boolean;
}

interface Channel {
  name: string;
  connected: boolean;
}

const initialState: ChannelsState = {
  channels: [],
  init: false,
};

export const usersSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channels = action.payload;
      state.init = true;
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.channels.push(action.payload);
    },
    removeChannel: (state, action: PayloadAction<string>) => {
      const newChannels = state.channels.filter((channel) => channel.name !== action.payload);
      state.channels = newChannels;
    },
    updateChannel: (state, action: PayloadAction<Channel>) => {
      const channel = state.channels.find((channel) => channel.name === action.payload.name);
      if (channel) {
        channel.connected = action.payload.connected;
      }
    },
  },
});

export const { addChannel, removeChannel, setChannels, updateChannel } = usersSlice.actions;
export const selectChannels = (state: RootState) => state.channels;
export default usersSlice.reducer;
