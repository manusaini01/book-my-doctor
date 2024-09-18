// import Link from 'next/link';
// import {
//   Home,
//   LineChart,
//   Package,
//   Package2,
//   PanelLeft,
//   Settings,
//   ShoppingCart,
//   Users2,
//   User as UserIcon
// } from 'lucide-react';
// import {
//   Breadcrumb,
//   BreadcrumbList,
// } from 'components/ui/breadcrumb';
// import { Button } from 'components/ui/button';
// import { Sheet, SheetContent, SheetTrigger, SheetClose } from 'components/ui/sheet';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger
// } from 'components/ui/tooltip';
// import { Analytics } from '@vercel/analytics/react';
// import { User } from './user';
// import { MyLogo } from 'components/icons';
// import Providers from './providers';
// import { SearchInput } from './search';

// export default function DashboardLayout({
//   children
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Providers>
//       <main className="flex min-h-screen w-full flex-col bg-muted/40">
//         <DesktopNav /> {/* MobileNav used for desktop view*/}
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//         <MobileNav /> {/* MobileNav used for mobile vuew */}
//             <DashboardBreadcrumb />
//             <SearchInput />
//             <User />
//           </header>
//           <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
//             {children}
//           </main>
//         </div>
//         <Analytics />
//       </main>
//     </Providers>
//   );
// }

// function MobileNav() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size="icon" variant="outline" className='sm:hidden'>
//           <PanelLeft className="h-5 w-5" />
//           <span className="sr-only">Toggle Menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="sm:max-w-xs">
//         <nav className="grid gap-6 text-lg font-medium">
//           <SheetClose asChild>
//             <Link
//               href="/hospital/dashboard"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <Home className="h-5 w-5" />
//               Home
//             </Link>
//           </SheetClose>
//           <SheetClose asChild>
//             <Link
//               href="/hospital/dashboard/our_doctors"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <Users2 className="h-5 w-5" />
//               Doctors
//             </Link>
//           </SheetClose>
//           <SheetClose asChild>
//             <Link
//               href="/hospital/dashboard/receptionist"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <UserIcon className="h-5 w-5" />
//               Receptionist
//             </Link>
//           </SheetClose>
//           <SheetClose asChild>
//             <Link
//               href="#"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <LineChart className="h-5 w-5" />
//               Dashboard 5
//             </Link>
//           </SheetClose>
//         </nav>
//         <div className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 <Settings className="h-5 w-5" />
//                 <span className="sr-only">Settings</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Settings</TooltipContent>
//           </Tooltip>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// function DesktopNav() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button size="icon" variant="outline" className='sm:block hidden'>
//           <PanelLeft className="h-5 w-5" />
//           <span className="sr-only">Toggle Menu</span>
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="left" className="sm:max-w-xs">
//         <nav className="grid gap-6 text-lg font-medium">
//           <SheetClose asChild>
//             <Link
//               href="/hospital/dashboard"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <Home className="h-5 w-5" />
//               Home
//             </Link>
//           </SheetClose>
//           <SheetClose asChild>
//             <Link
//               href="/hospital/dashboard/our_doctors"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <Users2 className="h-5 w-5" />
//               Doctors
//             </Link>
//           </SheetClose>
//           <SheetClose asChild>
//             <Link
//               href="/hospital/dashboard/receptionist"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <UserIcon className="h-5 w-5" />
//               Receptionist
//             </Link>
//           </SheetClose>
//           <SheetClose asChild>
//             <Link
//               href="#"
//               className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
//             >
//               <LineChart className="h-5 w-5" />
//               Dashboard 5
//             </Link>
//           </SheetClose>
//         </nav>
//         <div className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
//           <Tooltip>
//             <TooltipTrigger asChild>
//               <Link
//                 href="#"
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 <Settings className="h-5 w-5" />
//                 <span className="sr-only">Settings</span>
//               </Link>
//             </TooltipTrigger>
//             <TooltipContent side="right">Settings</TooltipContent>
//           </Tooltip>
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// function DashboardBreadcrumb() {
//   return (
//     <Breadcrumb className="hidden md:flex">
//       <BreadcrumbList>
//         <Link href='/'>
//           <MyLogo size={80} color='' />
//         </Link>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }












// import { Analytics } from '@vercel/analytics/react';
// import { User } from './user';
// import Providers from './providers';
// import { SearchInput } from './search';
// // import Sidebar from '@/components/partials/sidebar';
// import Sidebar from './components/Sidebar';

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <Providers>
//       <main className="flex min-h-screen w-full flex-col bg-muted/40">
//         <Sidebar />
//         {/* <Sidebar trans='en'/> */}
//         <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//           <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//             <SearchInput />
//             <User />
//           </header>
//           <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
//             {children}
//           </main>
//         </div>
//         <Analytics />
//       </main>
//     </Providers>
//   );
// }
















import Link from 'next/link';
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Users2,
  User as UserIcon
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from 'components/ui/breadcrumb';
import { Button } from 'components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from 'components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from 'components/ui/tooltip';
import { Analytics } from '@vercel/analytics/react';
import { User } from './user';
import { MyLogo } from 'components/icons';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <main className="flex min-h-screen w-full flex-col bg-muted/40">

        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-40">
          <header className="justify-between sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <DashboardBreadcrumb />
            <MobileNav />
            {/* <SearchInput /> */}
            <User />
          </header>
          <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
            {children}
          </main>
        </div>
        <Analytics />
      </main>
    </Providers>
  );
}

function DesktopNav() {
  return (
    <aside className="fixed pt-6 px-3 inset-y-0 left-0 z-10 hidden w-40 flex-col border-r bg-background sm:flex">
<h1 className='font-bold text-2xl'>Dashboard</h1>
      <nav className="flex flex-col gap-4 px-2 sm:py-5">

        <NavItem href="/hospital/dashboard" label="Home ">
          <Home className="h-5 w-5" />
        </NavItem>
        <NavItem href="/hospital/dashboard/our_doctors" label="Doctors ">
          <Users2 className="h-5 w-5" />
        </NavItem>

        <NavItem href="/hospital/dashboard/receptionist" label="Receptionist ">
          <UserIcon className="h-5 w-5" />
        </NavItem>

      </nav>
      {/* <nav className="mt-auto flex flex-col gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="#"
              className="flex h-9 w-9 justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav> */}
    </aside>
  );
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="#"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Vercel</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Users2 className="h-5 w-5" />
            Doctors
          </Link>
          <Link
            href="#"
            className="flex items-center gap-4 px-2.5 text-foreground"
          >
            <UserIcon className="h-5 w-5" />
            Receptionist
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function DashboardBreadcrumb() {
  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
      <Link href='/'>
      <MyLogo size={50} color=''></MyLogo>
      </Link>
        {/* <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        {/* <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="#">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        {/* <BreadcrumbItem>
          <BreadcrumbPage>All hospitals</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
