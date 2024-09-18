// lib/receptionistHooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import type { receptionistDispatch, receptionistStore, receptionistState } from '../../receptionistStore';

export const usereceptionistDispatch = () => useDispatch<receptionistDispatch>();
export const usereceptionistSelector: TypedUseSelectorHook<receptionistState> = useSelector;
export const usereceptionistStore = () => useStore<receptionistStore>();
