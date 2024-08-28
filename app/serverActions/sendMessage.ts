// /app/serverActions/appendChatMessage.ts
import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

interface Chat {
  role: string;
  content: string;
  id: string;
  timeCreated: string;
}

export async function sendMessage(slideId: string, chatMessage: string) {
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
      throw new Error('Invalid slideId');
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    // Fetch the chatList and find the chat with the specified slideId
    const chatList = userDoc.data()?.chatList || [];
    const slideData = chatList.find((item: any) => item.slideId === slideId);

    if (!slideData) {
      throw new Error('Chat not found');
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

    return newChat;

  } catch (error) {
    console.error('Error appending chat message:', error);
    throw new Error('Failed to append chat message');
  }
}
