'use client';

import { useState, useEffect, ReactElement } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Spinner from '@/app/components/shared/Spinner';
import ChatNav from '@/app/components/my-tutor/ChatNav';
import AddNewChatButton from '@/app/components/my-tutor/AddNewChatButton';
import LayoutError from '@/app/components/shared/LayoutError';
import NewChatWrapper from '@/app/components/my-tutor/NewChatWrapper';
import { auth } from '@/app/firebase/firebaseClient';

type ChatItem = {
  id: string;
  title: string;
  dateModified: string;
};

export default function Layout({ children }: { children: ReactElement }) {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    const db = getFirestore();
    let unsubscribeAuth: () => void;
    let unsubscribeChatList: () => void;

    const handleAuthChange = (user: User | null) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, `users/${userId}`);

        // Set up listener for chat list changes
        unsubscribeChatList = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const chatListData = doc.data()?.chatList || [];
            const simplifiedChatList = chatListData.map((chat: any) => ({
              id: chat.slideId,
              title: chat.slideName,
              dateModified: chat.dateModified
            }));

            setChatList(simplifiedChatList);
          } else {
            setChatList([]);
          }
          setLoading(false);
        }, (error) => {
          console.error('Error fetching chat list:', error);
          setError(true);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    };

    // Set up listener for auth changes
    unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    return () => {
      if (unsubscribeAuth) {
        unsubscribeAuth();
      }
      if (unsubscribeChatList) {
        unsubscribeChatList();
      }
    };
  }, []);
  
  if (loading) return <Spinner />;
  if (error) return <LayoutError errorType='default' />;

  return (
    <>
      <main className="h-full w-full relative flex flex-col px-0 overflow-hidden">
        <div className="mb-4 sticky top-0 px-4 inline-block">
          <div className="flex gap-2">
            <ChatNav chatList={chatList} />
            <AddNewChatButton />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-full text-sm overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
