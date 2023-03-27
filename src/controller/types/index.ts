import { ChangeEvent } from 'react';
import { rootReducer, store } from '../../model/store';

// User type
export interface User {
  id: number;
  name: string,
  age: number;
  about: string;
};

// Store types
export type RootState = ReturnType<typeof rootReducer>;
export type RootStore = typeof store;
export type AppDispatch = RootStore['dispatch'];

export interface IUserInfoHandling {
  userName: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement> | string) => void;
  userAge: string;
  onAgeChange: (e: ChangeEvent<HTMLInputElement> | string) => void;
  userAbout: string,
  onAboutChange: (e: ChangeEvent<HTMLInputElement> | string) => void;
  onClose: () => void;
}