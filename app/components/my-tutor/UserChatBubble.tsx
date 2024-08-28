// /app/components/my-tutor/UserChatBubble.tsx
import React from 'react';
import TimeAgo from 'react-time-ago';
import { ChatMessage } from './ChatWrapper';
import javascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

javascriptTimeAgo.addDefaultLocale(en);

interface UserChatBubbleProps {
  chatItem: ChatMessage;
}

const UserChatBubble: React.FC<UserChatBubbleProps> = ({ chatItem }) => {
  return (
    <div className="grid grid-flow-col gap-3 max-w-[60%] ml-auto">
      <div className="flex flex-col gap-2 items-end">
        <div className="bg-[var(--chat-bubble)] px-4 py-2 rounded-lg">
          <pre className="text-wrap font-sans break-all font-normal">{chatItem.content}</pre>
        </div>
        <small className="inline-block font-extralight"><TimeAgo date={new Date(chatItem.timeCreated)} /></small>
      </div>
      <figure className="w-6 h-6 rounded-full bg-tertiary p-1">
        <svg viewBox="0 0 256 256" className="w-full" xmlns="http://www.w3.org/2000/svg">
          <rect fill="none" className="w-full h-full" />
          <circle cx="128" cy="96" fill="none" r="64" stroke="#000" strokeMiterlimit="10" strokeWidth="16" />
          <path d="M31,216a112,112,0,0,1,194,0" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
        </svg>
      </figure>
    </div>
  );
};

export default UserChatBubble;
