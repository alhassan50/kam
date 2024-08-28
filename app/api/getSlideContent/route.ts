import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function POST(request: NextRequest) {
  const cookies = request.cookies;
  const sessionCookie = cookies.get('session')?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: 'You are not authorized.' }, { status: 401 });
  }

  try {
    const admin = await initAdmin();
    // Verify session cookie
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    // Extract user ID from decoded claims
    const userId = decodedClaims.uid;

    // Get the slideId from the request body
    const { slideId } = await request.json();

    if (!slideId) {
      return NextResponse.json({ error: 'slideId is required.' }, { status: 400 });
    }

    // Fetch chat data from Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const chatList = userDoc.data()?.chatList || [];

    // Find the chat with the matching slideId
    const chat = chatList.find((chat: any) => chat.slideId === slideId);

    if (!chat) {
      return NextResponse.json({ error: 'Chat not found.' }, { status: 404 });
    }

    // Return the slideContent
    const slideContent = chat.slideContent || null;

    return NextResponse.json({ slideContent });
  } catch (error) {
    console.error('Error verifying session cookie or fetching slide content:', error);
    return NextResponse.json({ error: 'Failed to fetch slide content' }, { status: 500 });
  }
}
