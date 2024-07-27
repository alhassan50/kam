'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Spinner from '@/app/components/shared/Spinner'; // Adjust the path as needed
import LayoutError from '@/app/components/my-tutor/LayoutError'; // Adjust the path as needed
import { Alert } from '@mui/material';
import Bin from './Bin';
import Edit from './Edit';

type ChatItem = {
  id: string;
  title: string;
  dateModified: string;
};

const ChatList = () => {
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean | null>(null);
  const [slideUpdateError, setSlideUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [originalValues, setOriginalValues] = useState<{ [key: string]: string }>({});
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  useEffect(() => {
    const auth = getAuth();
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
            // Initialize original values
            setOriginalValues(simplifiedChatList.reduce((acc: { [key: string]: string }, chat: ChatItem) => {
              acc[chat.id] = chat.title;
              return acc;
            }, {}));
          } else {
            setChatList([]);
            setOriginalValues({});
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

  const handleEdit = (id: string) => {
    if (editingId && editingId !== id) {
      // Revert changes for the previously edited item
      const inputElement = inputRefs.current[editingId];
      if (inputElement) {
        inputElement.value = originalValues[editingId] || '';
      }
    }
    setEditingId(id);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/deleteSlide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slideId: id }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Slide deleted successfully:', result);
        // Update the chat list after deletion
        setChatList((prevList) => prevList.filter((item) => item.id !== id));
        setSlideUpdateError(null); // Nullify the error state
        setUpdateSuccess('Slide deleted successfully!');
      } else {
        console.error('Failed to delete slide:', result.error);
        setUpdateSuccess(null); // Nullify the success state
        setSlideUpdateError(result.error);
      }
    } catch (error) {
      console.error('Error deleting slide:', error);
      setUpdateSuccess(null); // Nullify the success state
      setSlideUpdateError('An error occurred while deleting the slide.');
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === 'Enter') {
      const inputElement = inputRefs.current[id];
      if (inputElement) {
        const updatedName = inputElement.value;

        try {
          // Call the API to update slide name
          const response = await fetch('/api/updateSlideName', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slideId: id, updatedName }),
          });

          const result = await response.json();

          if (response.ok) {
            console.log('Slide name updated:', result);
            setSlideUpdateError(null); // Nullify the error state
            setUpdateSuccess('Slide name updated successfully!');
            setEditingId(null); // Exit editing mode
          } else {
            console.error('Failed to update slide name:', result.error);
            inputElement.value = originalValues[id] || ''; // Revert to original value
            setUpdateSuccess(null); // Nullify the success state
            setSlideUpdateError(result.error);
            setEditingId(null); // Exit editing mode
          }
        } catch (error) {
          console.error('Error updating slide name:', error);
          setUpdateSuccess(null); // Nullify the success state
          setSlideUpdateError('An error occurred while updating the slide name.');
          inputElement.value = originalValues[id] || ''; // Revert to original value
          setEditingId(null); // Exit editing mode
        }
      }
    } else if (e.key === 'Escape') {
      const inputElement = inputRefs.current[id];
      if (inputElement) {
        inputElement.value = originalValues[id] || '';
      }
      setEditingId(null); // Exit editing mode
    }
  };

  // Callback ref to store the reference of input elements
  const setRef = useCallback((id: string) => (el: HTMLInputElement | null) => {
    inputRefs.current[id] = el;
  }, []);

  // Focus the input field when it becomes enabled
  useEffect(() => {
    if (editingId) {
      const inputElement = inputRefs.current[editingId];
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, [editingId]);

  if (loading) return <Spinner />;
  if (error) return <LayoutError errorType='default' />;

  return (
    <div className="sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] mx-auto">
      {slideUpdateError && (
        <div className='fixed top-[10%] left-[40%] shadow-lg'>
          <Alert severity="error" onClose={() => setSlideUpdateError(null)}>
            {slideUpdateError}
          </Alert>
        </div>
      )}
      {updateSuccess && (
        <div className='fixed top-[10%] left-[40%] shadow-lg'>
          <Alert severity="success" onClose={() => setUpdateSuccess(null)}>
            {updateSuccess}
          </Alert>
        </div>
      )}
      <h2 className="mb-4">Manage Your Uploads</h2>
      <ul className='grid gap-4'>
        {chatList.map((slide) => (
          <li key={slide.id} className='flex gap-6 justify-between items-center'>
            <input
              ref={setRef(slide.id)}
              title='Slide Title'
              type="text"
              defaultValue={slide.title}
              disabled={editingId !== slide.id}
              className="px-4 py-2 border-[var(--bg-card)] w-full text-base rounded-[4px]"
              readOnly={editingId !== slide.id} // Make the input editable only when editing
              onKeyDown={(e) => handleKeyDown(e, slide.id)}
            />
            <div className='flex gap-2'>
              <button
                type="button"
                title="edit button"
                className='w-10 h-10 p-3 bg-tertiary rounded-md'
                onClick={() => handleEdit(slide.id)}
              >
                <Edit />
              </button>
              <button
                type="button"
                title="delete button"
                className='w-10 h-10 p-3 bg-red-500 rounded-md'
                onClick={() => handleDelete(slide.id)}
              >
                <Bin />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
