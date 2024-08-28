/* 'use server'

import { initAdmin } from "../firebase/firebaseAdmin";
import { redirect } from 'next/navigation'

export async function getChatList(sessionCookie: string) {
    const admin = await initAdmin()
  try {
    // Verify session cookie
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

    // Extract user ID from decoded claims
    const userId = decodedClaims.uid;

    // Fetch chat data from Firebase Realtime Database
    /* const chatListRef = admin.database().ref(`/chats/${userId}`);
    const snapshot = await chatListRef.once('value');
    const chatList = snapshot.val() || []; */

    //return (["Machine Learning", "Open Source Operating Systems", "Data Structures And Algorithms"])
/*     redirect(`/my-tutor/Machine Learning`)
  } catch (error) {
    console.error('Error verifying session cookie or fetching chat list:', error);
    throw new Error('Failed to fetch chat list');
  }
}
 */ 



// serverActions/getChatList.ts
'use server'

import { initAdmin } from "../firebase/firebaseAdmin";

export async function getChatList(sessionCookie: string) {
    const admin = await initAdmin();
    try {
        // Verify session cookie
        const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie, true);

        // Extract user ID from decoded claims
        const userId = decodedClaims.uid;

        // Fetch chat data from Firebase Realtime Database
        /* const chatListRef = admin.database().ref(`/chats/${userId}`);
        const snapshot = await chatListRef.once('value');
        const chatList = snapshot.val() || [];

        return chatList; */
        //return (["Machine Learning", "Open Source Operating Systems", "Data Structures And Algorithms"])
        return ([])
    } catch (error) {
        console.error('Error verifying session cookie or fetching chat list:', error);
        throw new Error('Failed to fetch chat list');
    }
}


