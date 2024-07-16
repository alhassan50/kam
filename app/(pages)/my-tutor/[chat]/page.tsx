import ChatInterface from "@/app/components/my-tutor/ChatInterface"

export async function generateMetadata({ params }: { params: { chat: string } }) {
  return {
    title: decodeURIComponent(params.chat),
  }
}
function Chat() {
  return (
    <div className="p-0">
      <ChatInterface />
    </div>
  )
}

export default Chat