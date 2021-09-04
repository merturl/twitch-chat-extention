import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface UsersState {
  users: string[];
  init: boolean;
}

const initialState: UsersState = {
  users: [],
  init: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<string[]>) => {
      state.users = action.payload;
      state.init = true;
    },
    addUser: (state, action: PayloadAction<string>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const newUsers = state.users.filter((user) => user !== action.payload);
      state.users = newUsers;
    },
  },
});

export const { addUser, removeUser, setUsers } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users;
export default usersSlice.reducer;
