// lib/hospitalStore.ts
import { configureStore } from '@reduxjs/toolkit';
import hospitalReducer from './features/hospital/hospitalSlice';

export const makehospitalStore = () => {
  return configureStore({
    reducer: {
      hospital: hospitalReducer,
    },
  });
};

export type hospitalStore = ReturnType<typeof makehospitalStore>;
export type hospitalState = ReturnType<hospitalStore['getState']>;
export type hospitalDispatch = hospitalStore['dispatch'];



