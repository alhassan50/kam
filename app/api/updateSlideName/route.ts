import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore'; // Import FieldValue directly

interface UpdateSlideRequest {
  slideId: string;
  updatedName: string;
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
    const { slideId, updatedName }: UpdateSlideRequest = await request.json();

    console.log(slideId, updatedName);
    

    if (!slideId || slideId.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid slideId' }, { status: 400 });
    }

    if (!updatedName || updatedName.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid slide name' }, { status: 400 });
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch the chatList and find the slide with the specified slideId
    const chatList = userDoc.data()?.chatList || [];
    const slideIndex = chatList.findIndex((item: any) => item.slideId === slideId);

    if (slideIndex === -1) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }

    // Update the slide name and dateModified
    chatList[slideIndex] = {
      ...chatList[slideIndex],
      slideName: updatedName,
      dateModified: new Date().toISOString(),
    };

    // Update the user's chatList in Firestore
    await userRef.update({
      chatList: chatList,
    });

    return NextResponse.json({ message: 'Slide name updated successfully', slide: chatList[slideIndex] });

  } catch (error) {
    console.error('Error updating slide name:', error);
    return NextResponse.json({ error: 'Failed to update slide name' }, { status: 500 });
  }
}
