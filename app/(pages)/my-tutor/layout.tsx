'use client'

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/shared/Spinner";
import NewChat from "@/app/components/my-tutor/NewChat";
import ChatNav from "@/app/components/my-tutor/ChatNav";
import AddNewChatButton from "@/app/components/my-tutor/AddNewChatButton";
import TextArea from "@/app/components/my-tutor/TextArea";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    useEffect(() => {
        const checkChatList = async () => {
          let response, chatList;
          try {
            response = await fetch('/api/chat-list'); // Update with actual API endpoint
            chatList = await response.json();
    
            if (chatList.length === 0) {
              router.push('?isNewChat=y');
            } else {
              const mostRecentChat = chatList[0]; // Logic to determine the most recent chat
              router.push(`/mypersonaltutor/${mostRecentChat.id}`);
            }
          } catch (error) {
            router.push('?isNewChat=y');
          } finally {
            setLoading(false); // Set loading to false after fetch completes
          }
        };
    
        checkChatList();
      }, [router]);

      if (loading) return <Spinner />

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
              <NewChat />
            </Suspense>
            <main className="h-full w-full px-0 pt-0">
                <div className="h-full flex flex-col">
                <div className="flex-1 h-full overflow-auto p-4">
                    <div className="mb-4 sticky top-0 inline-block">
                    <div className="flex gap-2">
                        <ChatNav />
                        <AddNewChatButton />
                    </div>
                    </div>
                    <div className="sm:w-[90%] h-full md:w-[70%] mx-auto text-sm">
                        {children}
                    </div>
                </div>
                <div className="w-full p-3 pb-0  bo">
                    <TextArea />
                </div>
                </div>
            </main>
        </>
    );
  }