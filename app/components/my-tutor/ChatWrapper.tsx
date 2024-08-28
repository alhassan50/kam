'use client';


import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import ChatInterface from './ChatInterface';
import TextArea from './TextArea';

export interface ChatMessage {
    id: string;
    timeCreated: string;
    role: 'user' | 'assistant';
    content: string;
}

export interface SlideData {
    slideId: string;
    slideContent: string;
    dateModified: string;
    chat: ChatMessage[];
}

interface ChatWrapperProps {
  slideId: string;
}

const ChatWrapper: React.FC<ChatWrapperProps> = ({ slideId }) => {
  const [slideData, setSlideData] = useState<SlideData | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();

    const handleAuthChange = (user: any) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, `users/${userId}`);

        const unsubscribeChat = onSnapshot(
          userDocRef,
          (userDoc) => {
            if (userDoc.exists()) {
              const chatList = userDoc.data()?.chatList || [];
              const slideData = chatList.find((item: SlideData) => item.slideId === slideId);
              setSlideData(slideData || null);
              if (slideData) setChatHistory(slideData.chat || []);
            } else {
              setSlideData(null);
              setChatHistory([]);
            }
            setLoading(false);
          },
          (error) => {
            console.error('Error listening to chat:', error);
            setError(true);
            setLoading(false);
          }
        );

        return () => {
          unsubscribeChat();
        };
      } else {
        setLoading(false);
      }
    };

    const unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    return () => {
      unsubscribeAuth();
    };
  }, [slideId]);

  useEffect(() => {
    console.log(slideData);
  }, [slideData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Failed to load chat data.</div>;
  }

  return (
    <div className="p-0 h-full flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <ChatInterface isAssistantTyping={isAssistantTyping} chat={chatHistory} />
      </div>
      <div className="w-full p-3 pb-0 bottom-0 mx-auto">
        <TextArea setIsAssistantTyping={setIsAssistantTyping} slideContent={slideData?.slideContent} chatHistory={chatHistory} slideId={slideId} />
      </div>
    </div>
  );
};

export default ChatWrapper;


  
