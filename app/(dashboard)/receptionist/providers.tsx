'use client';

import { TooltipProvider } from 'components/ui/tooltip';
import ReceptionistStoreProvider from './StoreProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReceptionistStoreProvider><TooltipProvider>{children}</TooltipProvider></ReceptionistStoreProvider>;
}
