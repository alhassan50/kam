'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import Spinner from '@/app/components/shared/Spinner'; // Adjust the path as needed
import LayoutError from '@/app/components/shared/LayoutError'; // Adjust the path as needed
import { Alert, CircularProgress } from '@mui/material';
import Bin from './Bin';
import Edit from './Edit';
import Check from './Check';
import Cross from './Cross';
import ChatListSkeleton from './ChatListSkeleton';
import Link from 'next/link';
import { auth } from '@/app/firebase/firebaseClient';

type ChatItem = {
  id: string;
  title: string;
  dateModified: string;
};

const DeleteConfirmationModal = ({
  onConfirm,
  onCancel,
  show,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  show: boolean;
  loading: boolean;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000000000] bg-[var(--modal-bg)] backdrop-blur-[4px] blur-bg-4">
      <div className="bg-secondary p-6 rounded shadow-lg">
        <h3 className="mb-5">Are you sure you want to delete this slide?</h3>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className={`px-4 py-2 rounded text-[14px] ${loading ? 'bg-gray-300 text-black cursor-not-allowed' : 'bg-gray-300 text-black'}`}
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded text-[14px] ${loading ? 'bg-red-500 cursor-not-allowed' : 'bg-red-500'}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <CircularProgress size={14} color="inherit" /> : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
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
  const [savingId, setSavingId] = useState<string | null>(null); // ID of the slide being saved
  const [editMode, setEditMode] = useState<string | null>(null); // ID of the slide in edit mode

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [slideIdToDelete, setSlideIdToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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
              dateModified: chat.dateModified,
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
    if (editMode && editMode !== id) {
      // Revert changes for the previously edited item
      const inputElement = inputRefs.current[editMode];
      if (inputElement) {
        inputElement.value = originalValues[editMode] || '';
      }
    }
    setEditMode(id);
  };

  const handleDelete = async () => {
    if (!slideIdToDelete) return;

    setDeleting(true); // Set the deleting state to show the loader
    try {
      const response = await fetch('/api/deleteSlide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slideId: slideIdToDelete }),
      });

      const result = await response.json();

      if (response.ok) {
        //console.log('Slide deleted successfully:', result);
        // Update the chat list after deletion
        setChatList((prevList) => prevList.filter((item) => item.id !== slideIdToDelete));
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
    } finally {
      setDeleting(false); // Reset the deleting state to hide the loader
      setShowDeletePopup(false); // Close the popup
      setSlideIdToDelete(null); // Reset the slide ID to be deleted
    }
  };

  const handleSave = async (id: string) => {
    setSavingId(id);

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
          //console.log('Slide name updated:', result);
          setSlideUpdateError(null);
          setUpdateSuccess('Slide name updated successfully!');
          setEditMode(null);
          setSavingId(null);
        } else {
          console.error('Failed to update slide name:', result.error);
          inputElement.value = originalValues[id] || '';
          setUpdateSuccess(null);
          setSlideUpdateError(result.error);
          setEditMode(null);
          setSavingId(null);
        }
      } catch (error) {
        console.error('Error updating slide name:', error);
        setUpdateSuccess(null);
        setSlideUpdateError('An error occurred while updating the slide name.');
        inputElement.value = originalValues[id] || '';
        setEditMode(null);
        setSavingId(null);
      }
    } else {
      setSavingId(null);
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

  if (loading) return <ChatListSkeleton />;
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
      {chatList.length === 0 ? (
        <p className="italic text-left">You don&apos;t have any slides. <Link href={'/my-tutor'} className='underline'>Click here</Link> to upload some slides!</p>
      ) : (
        <ul className='grid gap-4'>
          {chatList.map((slide) => (
            <li key={slide.id} className='flex gap-6 justify-between items-center'>
              <input
                ref={setRef(slide.id)}
                title='Slide Title'
                type="text"
                defaultValue={slide.title}
                disabled={editMode !== slide.id}
                className="px-4 py-2 border-[var(--bg-card)] w-full text-[14px] rounded-[4px]"
                readOnly={editMode !== slide.id}
              />
              <div className='flex gap-2'>
                {editMode === slide.id ? (
                  <>
                    <button
                      type="button"
                      title="okay button"
                      className='w-10 h-10 p-3 bg-green-500 rounded-md flex justify-center items-center'
                      onClick={() => handleSave(slide.id)}
                      disabled={savingId === slide.id}
                    >
                      {savingId === slide.id ? <CircularProgress size={14} color='inherit' /> : <Check />}
                    </button>
                    <button
                      type="button"
                      title="cancel button"
                      className='w-10 h-10 p-3 bg-gray-500 rounded-md flex justify-center items-center'
                      onClick={() => {
                        setEditMode(null); // Exit edit mode without saving
                        const inputElement = inputRefs.current[slide.id];
                        if (inputElement) {
                          inputElement.value = originalValues[slide.id] || '';
                        }
                      }}
                   
                      >
                      <Cross />
                    </button>
                  </>
                ) : (
                  <>
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
                      onClick={() => {
                        setShowDeletePopup(true);
                        setSlideIdToDelete(slide.id);
                      }}
                    >
                      <Bin />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      <DeleteConfirmationModal
        show={showDeletePopup}
        onConfirm={handleDelete}
        onCancel={() => setShowDeletePopup(false)}
        loading={deleting}
      />
    </div>
  );
};

export default ChatList;

      