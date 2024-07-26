'use client';

import Link from "next/link";

type ChatItem = {
  id: string;
  title: string;
  dateModified: string;
};

function ChatList({ chatList, selectedChat }: { chatList: ChatItem[], selectedChat: ChatItem | null }) {
  if (chatList.length === 0) return (
    <div className="absolute max-w-[200px] left-0 top-[120%] p-2 blur-bg backdrop-blur border border-[var(--bg-card)] rounded">
      <h3 className="text-[12px] max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis">
        You have no slides
      </h3>
    </div>
  );

  function orderByLatestDateModified(chatList: ChatItem[]): ChatItem[] {
    return chatList.sort((a, b) => {
      return new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime();
    });
  }

  const sortedChatList = orderByLatestDateModified(chatList);

  return (
    <div className="absolute max-w-[200px] left-0 top-[120%] p-2 blur-bg backdrop-blur border border-[var(--bg-card)] rounded">
      {sortedChatList.map((chat) => (
        <Link key={chat.id} href={`/my-tutor/${chat.id}`}>
          <div 
            title={`Select ${chat.title}`} 
            className="flex items-center max-w-full min-w-full gap-1 h-full p-2 hover:bg-[var(--hover-card)] rounded"
          >
            <h3 className="text-[12px] max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis">
              {chat.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChatList;
