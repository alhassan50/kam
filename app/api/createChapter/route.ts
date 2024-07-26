import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { initAdmin } from '@/app/firebase/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';
import { FieldValue } from 'firebase-admin/firestore'; // Import FieldValue directly

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
    const { description, name } = await request.json();
    
    if (!description || description.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid description content' }, { status: 400 });
    }

    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid name content' }, { status: 400 });
    }

    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Create new user document if it doesn't exist
      await userRef.set({
        chatList: [],
      });
    }

    // Generate a random slide ID
    const slideId = uuidv4();

    // Create new slide object with current date as dateModified
    const dateModified = new Date().toISOString();
    const newSlide = {
      slideId,
      slideName: name, // Use the name from the request body
      slideContent: description,
      chat: [],
      dateModified,
    };

    // Update the user's chatlist
    await userRef.update({
      chatList: FieldValue.arrayUnion(newSlide),
    });

    return NextResponse.json({ message: 'Slide description uploaded successfully', slide: newSlide });

  } catch (error) {
    console.error('Error uploading slide description:', error);
    return NextResponse.json({ error: 'Failed to upload slide description' }, { status: 500 });
  }
}
