import { NextRequest, NextResponse } from "next/server";
import * as yup from 'yup';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const { idToken, user } = await request.json();

        const admin = await initAdmin();
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds

        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

        const sessionOptions = {
            name: 'session',
            value: sessionCookie,
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };

        const userOptions = {
            name: 'user',
            value: JSON.stringify(user),
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };


        console.log(userOptions);
        

        const response = NextResponse.json({ message: 'Login successful' });

        response.cookies.set(sessionOptions);
        response.cookies.set(userOptions);

        return response;
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 401 });
    }
}
