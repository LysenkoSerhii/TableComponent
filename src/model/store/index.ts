import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../controller/types';
import modal from '../reducers/modalReducer';
import users from '../reducers/userReducer';

export const rootReducer = combineReducers({
  modal,
  users,
});

export const store = configureStore({
  reducer: rootReducer,
}	);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;