'use client';

import { TooltipProvider } from 'components/ui/tooltip';
import HospitalStoreProvider from './StoreProvider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HospitalStoreProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>;
    </HospitalStoreProvider>
  )
}
