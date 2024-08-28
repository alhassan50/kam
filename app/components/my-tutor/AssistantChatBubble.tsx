// /app/components/my-tutor/AssistantChatBubble.tsx
import React from 'react';
import TimeAgo from 'react-time-ago';
import { ChatMessage } from './ChatWrapper';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import javascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

javascriptTimeAgo.addDefaultLocale(en);

interface AssistantChatBubbleProps {
  chatItem: ChatMessage;
}

const AssistantChatBubble: React.FC<AssistantChatBubbleProps> = ({ chatItem }) => {  
  return (
    <div className="grid grid-flow-col gap-3 mr-auto">
      <div className="flex flex-col gap-2 order-2 items-start">
        <div className="">
          <pre className="text-wrap font-sans break-all font-light">
            {chatItem.content}
          </pre>
        </div>
        <small className="inline-block font-extralight"><TimeAgo date={new Date(chatItem.timeCreated)} /></small>
      </div>
      <figure className="w-6 h-6 rounded-full">
        <Image 
          width={20}
          height={20}
          alt="Tutor"
          src="/assets/images/kam-icon.svg"
          className="w-full h-full"
        />
      </figure>
    </div>
  );
};

export default AssistantChatBubble;
