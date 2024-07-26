import { NextRequest, NextResponse } from 'next/server';
import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function GET(request: NextRequest) {
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

    // Fetch chat data from Firestore
    const db = admin.firestore();
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ chatList: [] });
    }

    const chatList = userDoc.data()?.chatList || [];

    // Map chatList to only include the necessary fields
    const simplifiedChatList = chatList.map((chat: any) => ({
      id: chat.slideId,
      title: chat.slideName,
    }));

    console.log(simplifiedChatList);
    

    return NextResponse.json({ chatList: simplifiedChatList });
  } catch (error) {
    console.error('Error verifying session cookie or fetching chat list:', error);
    return NextResponse.json({ error: 'Failed to fetch chat list' }, { status: 500 });
  }
}
