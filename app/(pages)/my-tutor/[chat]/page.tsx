import ChatInterface from "@/app/components/my-tutor/ChatInterface"
import TextArea from "@/app/components/my-tutor/TextArea"
import { getChat } from "@/app/serverActions/getChat"
import { Metadata } from "next"

function Chat({ params }: { params: { chat: string } }) {
  return (
    <div className="p-0 h-full flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <ChatInterface slideId={params.chat} />
      </div>
      <div className="w-full p-3 pb-0  bottom-0 mx-auto">
        <TextArea slideId={params.chat} />
      </div>
    </div>
  )
}

export default Chat

type Props = {
  params: { chat: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slideId = params.chat;
  //let title = 'Not Found';
  let title = slideId;

  try {
    // Fetch chat data using the server action
    const chat = await getChat(slideId);
    
    if (chat) {
      title = chat.slideName || 'My Tutor';
    } else {
      title = 'My Tutor';
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: title
  };
}