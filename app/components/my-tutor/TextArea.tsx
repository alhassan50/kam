// /app/components/my-tutor/TextArea.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { styled } from '@mui/system';

const CustomAlert = styled(Alert)(({ theme }) => ({
  '& .MuiAlert-icon': {
    display: 'none', // Hides the warning icon
  },
  '& .MuiAlert-action': {
    display: 'inline-block', // Hides the close icon
  },
}));

function TextArea({ slideId }: { slideId: string }) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    const handleInput = () => {
      setTextareaHeight("auto"); // Reset the height to auto
      setTextareaHeight(`${textarea?.scrollHeight}px`); // Set the height to scroll height
    };

    textarea?.addEventListener('input', handleInput);

    return () => {
      textarea?.removeEventListener('input', handleInput);
    };
  }, []);

  const sendMessage = async () => {
    const chatMessage = textareaRef.current?.value;

    if (chatMessage && chatMessage.trim() !== "") {
      setIsSending(true);
      try {
        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slideId, chatMessage }),
        });

        const result = await response.json();

        if (response.ok) {
          console.log('Chat message sent:', result.chat);
          if (textareaRef.current) {
            textareaRef.current.value = '';
            setTextareaHeight("auto");
          }
        } else {
          console.error('Error sending chat message:', result.error);
          setError(result.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error sending chat message:', error);
        setError('Failed to send message');
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="relative w-full p-0 pb-0 bo">
      <form
        className="h-full flex gap-2 items-center sm:w-[95%] md:w-[80%] mx-auto border-[1px] border-[var(--bg-card)] rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        {error && (
          <div className="absolute bottom-[110%]">
            <CustomAlert severity="error" className='text-[12px] w-[300px]' onClose={() => setError(null)}>
              {error}
            </CustomAlert>
          </div>
        )}
        <textarea
          ref={textareaRef}
          title=""
          placeholder="Ask your tutor anything..."
          className="w-full outline-none text-sm bg-transparent resize-none h-full p-3 overflow-y-auto"
          style={{
            height: textareaHeight,
            maxHeight: '100px', // Maximum height before scroll appears
          }}
        ></textarea>
        <div
          className="p-3 flex items-end min-h-full"
          style={{
            height: textareaHeight,
            maxHeight: '100px', // Maximum height before scroll appears
          }}
        >
          <button
            type="submit"
            className={`bg-primary text-sm text-secondary px-4 py-2 font-medium rounded-[4px] ${isSending ? 'bg-slate-300 cursor-not-allowed' : ''}`}
            disabled={isSending}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default TextArea;
