import { NextResponse } from 'next/server';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function POST(request: Request) {
  let idToken

  try {
    const body = await request.json();
    idToken = body.idToken;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
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

    const response = NextResponse.json({ session: sessionCookie});
    response.cookies.set(options);

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 401 });
  }
}
