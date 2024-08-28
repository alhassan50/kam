import React, { useRef, useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { styled } from '@mui/system';
import { ChatMessage } from './ChatWrapper';

const CustomAlert = styled(Alert)(({ theme }) => ({
  '& .MuiAlert-icon': {
    display: 'none',
  },
  '& .MuiAlert-action': {
    display: 'inline-block',
  },
}));

interface TextAreaProps {
  slideId: string;
  chatHistory: ChatMessage[];
  slideContent: string | undefined;
  setIsAssistantTyping: (isTyping: boolean) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ slideId, chatHistory, slideContent, setIsAssistantTyping }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assistantResponse, setAssistantResponse] = useState<string | null>(null);
  const [assistantError, setAssistantError] = useState<boolean>(false);
  const [localChatHistory, setLocalChatHistory] = useState<ChatMessage[]>(chatHistory);
  const [initAssistatResponse, setInitAssistatResponse] = useState<boolean>(false);


/*   useEffect(() => {
    console.log("chatHistory:::", chatHistory);
  }, [chatHistory]) */

  useEffect(() => {
    const textarea = textareaRef.current;

    const handleInput = () => {
      setTextareaHeight("auto");
      setTextareaHeight(`${textarea?.scrollHeight}px`);
    };

    textarea?.addEventListener('input', handleInput);

    return () => {
      textarea?.removeEventListener('input', handleInput);
    };
  }, []);

  const sendMessage = async (chatMessage: string, role: 'user' | 'assistant') => {
    try {
      const newMessage = {
        id: Date.now().toString(),
        timeCreated: new Date().toISOString(),
        role,
        content: chatMessage,
      };

      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slideId, chatMessage, role }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("newMessage::::::", newMessage);
        
        setLocalChatHistory(prevLocalChatHistory => {
          return [...prevLocalChatHistory, newMessage]
        });
        //console.log('Chat message sent:', result.chat);
        if (role === 'user' && textareaRef.current) {
          textareaRef.current.value = '';
          setTextareaHeight("auto");
        }
      } else {
        console.error('Error sending chat message:', result.error);
        if (role === 'assistant') {
          setAssistantError(true);
        } else {
          setError(result.error || 'Unknown error');
        }
        return false;
      }
    } catch (error) {
      console.error('Error sending chat message:', error);
      if (role === 'assistant') {
        setAssistantError(true);
      } else {
        setError('Failed to send message');
      }
      return false;
    } finally {
      setIsSending(false);
    }
    return true;
  };

  const handleInteraction = async () => {
    const chatMessage = textareaRef.current?.value;

    if (chatMessage && chatMessage.trim() !== "") {
      setIsSending(true);
      const userMessageSent = await sendMessage(chatMessage, 'user');
      if (userMessageSent) {
        /* generateAssistantResponse(); */
        setInitAssistatResponse(true)
      }
    }
  };

  useEffect(() => {
    /* console.log("localChatHistory:::", localChatHistory); */
    console.log("initAssistatResponse::::", initAssistatResponse);
    
    if (initAssistatResponse) {
      console.log("localChatHistory:::", localChatHistory);
      //setInitAssistatResponse(false)
      //console.log(chatHistory)
      generateAssistantResponse()
    }
  }, [localChatHistory, initAssistatResponse])

  const generateAssistantResponse = async () => {
    setAssistantError(false);
    setIsAssistantTyping(true);
    try {
      console.log("chatHistory::::::", chatHistory);
      const response = await fetch('/api/getAssistantResponse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatHistory: localChatHistory, slideContent: slideContent }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        setInitAssistatResponse(false)
        setAssistantResponse(result.answer);
      } else {
        console.error('Error generating assistant response:', result.error);
        setAssistantError(true);
      }
    } catch (error) {
      console.error('Error generating assistant response:', error);
      setAssistantError(true);
      setIsAssistantTyping(false);
    }
  };

  
  useEffect(() => {
    if (assistantResponse) {
      const sendAssistantMessage = async () => {
        const messageSent = await sendMessage(assistantResponse, 'assistant');
        if (messageSent) {
          setAssistantResponse(null);
          setIsAssistantTyping(false); // Move this here to ensure it's only called after the message is sent
        }
      };
      sendAssistantMessage();
    }
  }, [assistantResponse]);

  const handleTryAgain = async () => {
    console.log(assistantResponse);
    setAssistantError(false);
    setIsAssistantTyping(true); // Move this here to ensure it's only called after the message is sent
    
    if (assistantResponse) {
      const messageSent = await sendMessage(assistantResponse, 'assistant');
      if (messageSent) {
        setAssistantResponse(null);
        setIsAssistantTyping(false); // Move this here to ensure it's only called after the message is sent
      }
    } else {
      generateAssistantResponse();
    }
  };

  return (
    <div className="relative w-full p-0 pb-0 bo">
      {assistantError ? (
        <div className='flex flex-col gap-2 justify-center items-center'>
          <h3 className='text-red-400'>There was an error generating a response. Check your internet connection and try again.</h3>
          <button
            className='bg-primary hover:bg-transparent hover:text-primary border border-primary transition-all duration-150 text-[12px] text-secondary px-[12px] py-[4px] font-medium rounded-[4px] hidden md:block'
            type='button'
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        </div>
      ) : (
        <form
          className="h-full flex gap-2 items-center sm:w-[95%] md:w-[80%] mx-auto border-[1px] border-[var(--bg-card)] rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleInteraction();
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
              {isSending ? 'Sending' : 'Send'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TextArea;