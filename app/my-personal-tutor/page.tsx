
import NewChat from "../components/my-personal-tutor/NewChat"
import ChatList from "../components/my-personal-tutor/ChatList"
import AddNewChatButton from "../components/my-personal-tutor/AddNewChatButton"
import TextArea from "../components/my-personal-tutor/TextArea"
import ChatInterface from "../components/my-personal-tutor/ChatInterface"

function MyPersonalTutor() {
  return (
    <>
      <NewChat />
      <main className="h-full w-full px-0 pt-0">
        <div className="h-full flex flex-col">
          <div className="flex-1 h-full overflow-auto p-4">
            <div className="mb-4 sticky top-0 inline-block">
              <div className="flex gap-2">
                <ChatList />
                <AddNewChatButton />
              </div>
            </div>
            <div className="sm:w-[90%] md:w-[70%] mx-auto text-sm">
              <ChatInterface />
            </div>
          </div>
          <div className="w-full p-3 pb-0  bo">
            <TextArea />
          </div>
        </div>
      </main>
    </>
  )
}

export default MyPersonalTutor