import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

interface DeleteSlideRequest {
  slideId: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get the session cookie
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('session');

    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Firebase Admin
    const admin = await initAdmin();

    // Verify the token from the session cookie
    const decodedToken = await admin.auth().verifySessionCookie(sessionCookie.value, true);
    const uid = decodedToken.uid;

    // Parse the request body
    const { slideId }: DeleteSlideRequest = await request.json();

    if (!slideId || slideId.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid slideId' }, { status: 400 });
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch the chatList and remove the slide with the specified slideId
    const chatList = userDoc.data()?.chatList || [];
    const newChatList = chatList.filter((item: any) => item.slideId !== slideId);

    // Update the user's chatList in Firestore
    await userRef.update({
      chatList: newChatList,
    });

    return NextResponse.json({ message: 'Slide deleted successfully' });

  } catch (error) {
    console.error('Error deleting slide:', error);
    return NextResponse.json({ error: 'Failed to delete slide' }, { status: 500 });
  }
}
