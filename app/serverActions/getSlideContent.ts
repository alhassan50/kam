import { initAdmin } from '@/app/firebase/firebaseAdmin';

export async function getSlideContent({ slideId, sessionCookie }: { slideId: string, sessionCookie: string | undefined }) {
  if (!sessionCookie) {
    throw new Error('You are not authorized.');
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
      throw new Error('User not found.');
    }

    const chatList = userDoc.data()?.chatList || [];

    // Find the chat with the matching slideId
    const chat = chatList.find((chat: any) => chat.slideId === slideId);

    if (!chat) {
      throw new Error('Chat not found.');
    }

    // Return the slideContent
    const slideContent = chat.slideContent || null;

    return { slideContent };
  } catch (error) {
    console.error('Error verifying session cookie or fetching slide content:', error);
    throw new Error('Failed to fetch slide content');
  }
}
