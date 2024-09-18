// lib/hospitalHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import type { hospitalDispatch, hospitalStore, hospitalState } from '../../hospitalStore';

export const usehospitalDispatch = () => useDispatch<hospitalDispatch>();
export const usehospitalSelector: TypedUseSelectorHook<hospitalState> = useSelector;
export const usehospitalStore = () => useStore<hospitalStore>();
