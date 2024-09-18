// lib/receptionistStore.ts
import { configureStore } from '@reduxjs/toolkit';
import receptionistReducer from './features/receptionist/receptionistSlice';

export const makereceptionistStore = () => {
  return configureStore({
    reducer: {
      receptionist: receptionistReducer,
    },
  });
};

export type receptionistStore = ReturnType<typeof makereceptionistStore>;
export type receptionistState = ReturnType<receptionistStore['getState']>;
export type receptionistDispatch = receptionistStore['dispatch'];