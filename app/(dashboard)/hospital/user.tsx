'use client'
import { Button } from 'components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu';
import Link from 'next/link';
import { LogoutButton } from 'app/actions/logoutButton';
import { useEffect, useState } from 'react';

export function User() {
  const [session, setSession] = useState<{ user: string; image: string } | null>(null);
  
  useEffect(() => {
    async function fetchSession() {
      // Replace the following line with actual logic to fetch session data
      const sessionData = { user: "abc", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" };
      // const sessionData = await auth();
      setSession(sessionData);
    }

    fetchSession();
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={session.image ?? '/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href={`/dashboard/my-profile`} >
          My Profile
          </Link>
          </DropdownMenuItem>
        {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href="/api/auth/signin">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
