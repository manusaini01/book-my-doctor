'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from 'components/ui/tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={clsx(
            'flex h-12 w-12 items-start justify-start rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
            {
              'text-black': pathname === href
            }
          )}
        >
           <div className="icon mr-1">{children}</div> {/* Icon here */}
          <span className="label text-sm font-semibold">{label}</span> {/* Label here */}
        </Link>
      </TooltipTrigger>
      {/* <TooltipContent side="right">{label}</TooltipContent> */}
    </Tooltip>
  );
}
