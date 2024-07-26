// /app/api/auth/check/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    //console.log("sessionCookie:::::::::::", sessionCookie);
    
    const isLoggedIn = !!sessionCookie;

    return NextResponse.json({ isLoggedIn });
}
