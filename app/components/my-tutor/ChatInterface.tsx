// ChatInterface.tsx
import React, { useRef, useEffect } from 'react';
import LoadChatBubble from './LoadChatBubble';
import { ChatMessage } from './ChatWrapper';
import UserChatBubble from './UserChatBubble';
import AssistantChatBubble from './AssistantChatBubble';
import DefaultChatInterface from './DefaultChatInterface';
interface ChatInterfaceProps {
  chat: ChatMessage[];
  isAssistantTyping: boolean; // New prop to track if the assistant is typing
}

function ChatInterface({ chat, isAssistantTyping }: ChatInterfaceProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chat, isAssistantTyping]);

  return (
    <div className='h-full p-4 sm:w-[90%] flex flex-col gap-4 md:w-[80%] lg:w-[70%] mx-auto text-sm'>
      {chat.length > 0 ? (
        <>
          {chat.map((chatItem) => (
            chatItem.role === 'user' ? (
              <UserChatBubble key={chatItem.id} chatItem={chatItem} />
            ) : (
              <AssistantChatBubble key={chatItem.id} chatItem={chatItem} />
            )
          ))}
          {isAssistantTyping && <LoadChatBubble />} {/* Show loader when assistant is typing */}
          <div ref={chatEndRef} />
        </>
      ) : (
        <DefaultChatInterface />
      )}
    </div>
  );
}

export default ChatInterface;
