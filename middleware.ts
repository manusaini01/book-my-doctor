import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get('refreshToken')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  const currentPath = req.nextUrl.pathname;

  if (!token && currentPath !== '/' && currentPath !== '/login') {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
  else if (!token && currentPath === '/login') {
    return NextResponse.next();
  }

  try {
    // Skip API routes to avoid loops
    if (req.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.next();
    }

    // Determine if the user is already on the correct page
    const roleRedirectResponse = await fetch(new URL('/api/auth/redirect-role', req.url), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
      redirect: 'manual',
    });

    if (roleRedirectResponse.status === 200) {
      const { location } = await roleRedirectResponse.json();
      // Redirect only if the current path is not under the correct role's sub-routes
      if (location && !currentPath.startsWith(location)) {
        return NextResponse.redirect(new URL(location, req.url));
      }
      // if (location && currentPath !== location) {
      //   return NextResponse.redirect(new URL(location, req.url));
      // }
    }

  } catch (error) {
    console.error('Error during role-based redirection:', error);
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
// };

export const config = {
  matcher: [
    '/admin/:path*',        // Protect all admin routes
    '/hospital/:path*',     // Protect all hospital routes
    '/doctor/:path*',       // Protect all doctor routes
    '/receptionist/:path*', // Protect all receptionist routes
    '/login'
  ],
}