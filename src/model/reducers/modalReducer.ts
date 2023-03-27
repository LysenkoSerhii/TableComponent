import { createSlice } from "@reduxjs/toolkit";
import { EModalActions } from "../../controller/enums";

const initialState = {
  type: EModalActions.CLOSE_MODAL,
  isShow: false,
  total: 0,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    setTotal(state, action) {
      state.total = action.payload;
    },
    showAddUserModal(state) {
      state.type = EModalActions.ADD_MODAL;
      state.isShow = true;
    },
    closeModal(state) {
      state.type = EModalActions.CLOSE_MODAL;
      state.isShow = false;
    },
  },
});

const { reducer, actions } = modalSlice;
export default reducer;
export const {
  showAddUserModal,
  closeModal,
  setTotal,
} = actions;