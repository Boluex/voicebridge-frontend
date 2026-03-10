import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  publicRoutes: ['/', '/auth(.*)', '/payment(.*)'],
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

