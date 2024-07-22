import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('heyyy');
    
    try {
        const response = NextResponse.json({ message: 'Logged out successfully' });

        // Set the session cookie to an empty value and expire it
        response.cookies.set({
            name: 'session',
            value: '', // Clear the cookie value
            maxAge: 0, // Expire the cookie immediately
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only send cookie over HTTPS
            path: '/',
            sameSite: 'strict', // or 'lax' depending on your requirements
        });

        return response;
    } catch (error) {
        console.error('Error during logout:', error);
        return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
    }
}
