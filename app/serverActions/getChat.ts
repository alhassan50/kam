import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function getChat(slideId: string) {
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
    const uid = decodedToken.uid;

    if (!slideId || slideId.trim().length === 0) {
      throw new Error('Invalid slide name content');
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    // Fetch the chatlist and find the chat with the specified slideId
    const chatList = userDoc.data()?.chatList || [];
    
    const chat = chatList.find((item: any) => item.slideId === slideId);

    if (!chat) {
      throw new Error('Slides not found');
    }

    return chat;

  } catch (error) {
    console.error('Error fetching chat:', error);
    throw new Error('Failed to fetch slides');
  }
}
