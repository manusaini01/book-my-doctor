"use client";

import { useState } from "react";
import { Home, Users2, User as UserIcon, Settings } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "components/ui/tooltip";

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-10 flex flex-col border-r bg-background transition-all duration-100 sm:flex ${
        isExpanded ? "w-52" : "w-14"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <nav className="flex flex-col items-start gap-4 px-2 sm:py-5">
        {/* Home */}
        <NavItem href="/hospital/dashboard" label="Home" icon={<Home className="h-5 w-5" />} isExpanded={isExpanded} />

        {/* Doctors */}
        <NavItem href="/hospital/dashboard/our_doctors" label="Doctors" icon={<Users2 className="h-5 w-5" />} isExpanded={isExpanded} />

        {/* Receptionist */}
        <NavItem href="/hospital/dashboard/receptionist" label="Receptionist" icon={<UserIcon className="h-5 w-5" />} isExpanded={isExpanded} />
      </nav>

      <nav className="mt-auto flex flex-col items-start gap-4 px-2 sm:py-5">
        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-4 p-2 transition-all duration-100">
              <Settings className="h-5 w-5" />
              {isExpanded && <span className="label">Settings</span>}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}

function NavItem({ href, label, icon, isExpanded }: { href: string; label: string; icon: React.ReactNode; isExpanded: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-4 p-2 transition-all duration-300">
      {icon}
      {isExpanded && <span className="label">{label}</span>}
    </Link>
  );
}
