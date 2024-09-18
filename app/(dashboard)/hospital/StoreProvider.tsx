// app/hospital/StoreProvider.tsx
'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makehospitalStore, hospitalStore } from '../../../lib/hospitalStore';

export default function HospitalStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<hospitalStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makehospitalStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
