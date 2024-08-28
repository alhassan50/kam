import { useEffect, useState } from "react";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
import { auth } from "@/app/firebase/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";

export const useChatList = () => {
  const [chatList, setChatList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const db = getFirestore();
    let unsubscribeAuth: () => void;
    let unsubscribeChatList: () => void;

    const handleAuthChange = (user: User | null) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, `users/${userId}`);

        console.log(userDocRef)

        unsubscribeChatList = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const chatListData = doc.data()?.chatList || [];
            const simplifiedChatList = chatListData.map((chat: any) => ({
              id: chat.slideId,
              title: chat.slideName,
              dateModified: chat.dateModified
            }));

            setChatList(simplifiedChatList);
            console.log(chatList);
            
          } else {
            setChatList([]);
          }
          setLoading(false);
        }, (error) => {
          console.error('Error fetching chat list:', error);
          setError('Error fetching chat list');
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeChatList) unsubscribeChatList();
    };
  }, []);
  
  useEffect(() => {
    console.log(chatList);
  }, [chatList]);

  return { chatList, loading, error };
};
