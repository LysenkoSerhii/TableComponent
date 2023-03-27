import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../controller/types";

interface IInitialState {
  users: User[],
}

const initialState: IInitialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setUsersR: (state, action) => {
      state.users = action.payload;
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    editUser: (state, action: PayloadAction<User>) => {
      state.users = state.users.map(user => (
        user.id !== action.payload.id ? user : action.payload
      ))
    },
    deleteUserR: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    }
  },
});

const { reducer, actions } = usersSlice;
export default reducer;
export const {
  addNewUser,
  editUser,
  deleteUserR,
  setUsersR,
} = actions;