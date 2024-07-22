import { NextRequest, NextResponse } from "next/server";
import * as yup from 'yup';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
    try {
        const {idToken} = await request.json();

        const admin = await initAdmin();
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds

        const sessionCookie = await admin.auth().createSessionCookie(idToken, { expiresIn });

        const options = {
            name: 'session',
            value: sessionCookie,
            maxAge: expiresIn,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        };

        const response = NextResponse.json({ session: sessionCookie });
        response.cookies.set(options);

        return response;
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            // Handle validation errors
            const validationErrors = error.inner.reduce((acc, curr) => {
                if (curr.path) {
                    acc[curr.path] = curr.message;
                }
                return acc;
            }, {} as { [key: string]: string });
            return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
        }
        console.error('Error processing login:', error);
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
}
