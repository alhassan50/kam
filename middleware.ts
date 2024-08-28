import { NextResponse, NextRequest } from "next/server"

export function middleware (request: NextRequest) {
    const sessionCookie = request.cookies.get('session')
   // console.log(sessionCookie);
    const originalUrl = encodeURIComponent(request.url);
    
    //if (!sessionCookie) return NextResponse.redirect(new URL(`/login`, request.url));
    if (!sessionCookie) return NextResponse.redirect(new URL(`/login?redirect=${originalUrl}`, request.url));

    return NextResponse.next()
}

export const config = {
    matcher: ['/my-tutor', '/my-tutor/:path*', '/take-assessment/:path*', '/settings/:path*' ]
}