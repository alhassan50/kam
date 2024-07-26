// /app/api/chat/sendMessage.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

interface Chat {
  role: string;
  content: string;
  id: string;
  timeCreated: string;
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
    const { slideId, chatMessage } = await request.json();

    if (!slideId || slideId.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid slideId' }, { status: 400 });
    }

    if (!chatMessage || chatMessage.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid chat message content' }, { status: 400 });
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch the chatList and find the chat with the specified slideId
    const chatList = userDoc.data()?.chatList || [];
    const slideData = chatList.find((item: any) => item.slideId === slideId);

    if (!slideData) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
    }

    const newChat: Chat = {
      role: 'user',
      content: chatMessage,
      id: uuidv4(),
      timeCreated: new Date().toISOString(),
    };

    // Append the new chat message to the chat array
    slideData.chat.push(newChat);

    // Update the user's chatList in Firestore
    await userRef.update({
      chatList: chatList,
    });

    return NextResponse.json({ message: 'Chat message appended successfully', chat: newChat });

  } catch (error) {
    console.error('Error appending chat message:', error);
    return NextResponse.json({ error: 'Failed to send chat message' }, { status: 500 });
  }
}
