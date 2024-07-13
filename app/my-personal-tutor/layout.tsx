import AddNewChatButton from "../components/my-personal-tutor/AddNewChatButton";
import ChatInterface from "../components/my-personal-tutor/ChatInterface";
import ChatNav from "../components/my-personal-tutor/ChatNav";
import NewChat from "../components/my-personal-tutor/NewChat";
import TextArea from "../components/my-personal-tutor/TextArea";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            {/* <NewChat />
            <main className="h-full w-full px-0 pt-0">
                <div className="h-full flex flex-col bg-transparent">
                    <div className="p-4 sticky top-0 inline-block bg-transparent">
                        <div className="flex gap-2">
                            <ChatNav />
                            <AddNewChatButton />
                        </div>
                    </div>
                    <div className="flex-1 h-full overflow-auto p-4">
                        <div className="sm:w-[90%] md:w-[70%] mx-auto text-sm">
                            <ChatInterface />
                        </div>
                    </div>
                    <TextArea />
                </div>
            </main> */}
            {children}
        </>
    );
  }