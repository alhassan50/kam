'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
import ChatList from "./ChatList";

type ChatItem = {
  id: string;
  title: string;
  dateModified: string;
};

function ChatNav({ chatList }: { chatList: ChatItem[] }) {
  const [isChatListOpened, setIsChatListOpened] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<ChatItem | null>(null);
  const chatNavRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/my-tutor/')) {
      const chatId = pathname.split('/')[2];
      const foundChat = chatList.find(chat => chat.id === chatId);
      if (foundChat) {
        setSelectedChat(foundChat);
      }
    } else {
      setSelectedChat(null);
    }
  }, [pathname, chatList]);

  const toggleChatList = () => {
    setIsChatListOpened(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (chatNavRef.current && !chatNavRef.current.contains(event.target as Node)) {
      setIsChatListOpened(false);
    }
  };

  useEffect(() => {
    if (isChatListOpened) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatListOpened]);

  const handleChatSelection = (chat: ChatItem) => {
    setSelectedChat(chat);
    router.push(`/my-tutor/${chat.id}`);
  };

  return (
    <div
      ref={chatNavRef}
      title={!isChatListOpened ? "Open chat list" : "Close chat list"}
      className="relative cursor-pointer z-[1000]"
      onClick={toggleChatList}
    >
      <button 
        type="button"
        title="Select slides" 
        className="blur-bg flex items-center gap-1 h-full p-2 hover:bg-[var(--hover-card)] rounded backdrop-blur border border-[var(--bg-card)]"
      >
        <h3 className="text-sm max-w-[120px] whitespace-nowrap overflow-hidden overflow-ellipsis">
          {selectedChat?.title || 'Select Slides'}
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M11.341 4.747a1 1 0 0 1 1.318 0l4 3.5a1 1 0 1 1-1.317 1.506L12 6.829 8.659 9.753a1 1 0 0 1-1.317-1.506l4-3.5Zm-4.095 9.61a1 1 0 0 1 1.41-.096L12 17.174l3.343-2.913a1 1 0 1 1 1.314 1.508l-4 3.485a1 1 0 0 1-1.314 0l-4-3.485a1 1 0 0 1-.097-1.411Z" clipRule="evenodd"></path>
        </svg>
      </button>
      {isChatListOpened && <ChatList chatList={chatList} selectedChat={selectedChat} />}
    </div>
  );
}

export default ChatNav;
