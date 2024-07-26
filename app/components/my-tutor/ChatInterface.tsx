'use client'

import React, { useEffect, useRef, useState } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Spinner from '../shared/Spinner';
import TimeAgo from 'react-time-ago';
import javascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

javascriptTimeAgo.addDefaultLocale(en);

interface Chat {
  id: string;
  timeCreated: string;
  role: string;
  content: string;
}

function ChatInterface({ slideId }: { slideId: string }) {
  const [chat, setChat] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);

  // Ref for the chat container
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const db = getFirestore();
    const auth = getAuth();

    // Function to handle authenticated user's data fetching
    const handleAuthChange = (user: any) => {
      if (user) {
        const userId = user.uid;
        const userDocRef = doc(db, `users/${userId}`);

        // Set up a real-time listener for the user's chat list
        const unsubscribeChat = onSnapshot(userDocRef, (userDoc) => {
          if (userDoc.exists()) {
            const chatList = userDoc.data()?.chatList || [];
            const slideData = chatList.find((item: any) => item.slideId === slideId);
            if (slideData) {
              setChat(slideData.chat || []);
            } else {
              setChat([]);
            }
          } else {
            setChat([]);
          }
          setLoading(false);
        }, (error) => {
          setError(true);
          setLoading(false);
        });

        // Clean up the Firestore listener on component unmount
        return () => {
          unsubscribeChat();
        };
      } else {
        setLoading(false);
      }
    };

    // Set up listener for auth changes
    const unsubscribeAuth = onAuthStateChanged(auth, handleAuthChange);

    // Clean up auth listener on component unmount
    return () => {
      unsubscribeAuth();
    };
  }, [slideId]);

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chat]);

  if (loading) {
    return (
      <div className='h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className='h-full flex items-center justify-center'>
        <h2 className='text-center leading-normal'>
          Error loading chat data.
        </h2>
      </div>
    );
  }

  return (
    <div className='h-full p-4 sm:w-[90%] flex flex-col gap-4 md:w-[80%] mx-auto text-sm'>
      {chat.length > 0 ? (
        <>
          {chat.map((chatItem) => (
            <div key={chatItem.id} className={`grid grid-flow-col gap-3 max-w-[60%] ${chatItem.role === 'user' ? 'ml-auto' : 'mr-auto' }`}>
              <div className={`flex flex-col items-end gap-2`}>
                <div className='bg-[var(--chat-bubble)] px-4 py-2 rounded-lg'>
                  <pre className='text-wrap break-all font-extralight'>{chatItem.content}</pre>
                </div>
                <small className='inline-block font-extralight'><TimeAgo date={new Date(chatItem.timeCreated)} /></small>
                {/* <small className='inline-block font-extralight'>{new Date(chatItem.timeCreated).toLocaleString()}</small> */}
              </div>
              <figure className='w-6 h-6 rounded-full p-1 bg-tertiary'>            
                  <svg viewBox="0 0 256 256" className='w-full' xmlns="http://www.w3.org/2000/svg"><rect fill="none" className='w-full h-full'/><circle cx="128" cy="96" fill="none" r="64" stroke="#000" strokeMiterlimit="10" strokeWidth="16"/><path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"/></svg>
              </figure>
            </div>
          ))}
          {/* This div will be used to scroll to the bottom */}
          <div ref={chatEndRef} />
        </>
      ) : (
        <div className='h-full flex items-start  justify-center'>
          <h2 className='text-center leading-normal'>
            Hello 👋🏽, I am your Personal Tutor! <br /> How can I help you today?
          </h2>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
