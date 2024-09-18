// app/receptionist/StoreProvider.tsx
'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makereceptionistStore, receptionistStore } from '../../../lib/receptionistStore';

export default function ReceptionistStoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<receptionistStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makereceptionistStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
