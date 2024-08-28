import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function getUser() {
  try {
    // Get the session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
      throw new Error('Unauthorized');
    }

    // Initialize Firebase Admin
    const admin = await initAdmin();

    // Verify the token from the session cookie
    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie.value, true);

    // Get the user information using the decoded token
    const user = await admin.auth().getUser(decodedToken.uid);

    return user;

  } catch (error) {
    console.error('Error verifying session cookie:', error);
    throw new Error('Failed to verify session cookie');
  }
}
