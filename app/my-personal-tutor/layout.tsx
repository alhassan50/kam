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
            <NewChat />
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