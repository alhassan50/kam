import ChatInterface from "@/app/components/my-tutor/ChatInterface"
import ChatWrapper from "@/app/components/my-tutor/ChatWrapper"
import TextArea from "@/app/components/my-tutor/TextArea"
import { getChat } from "@/app/serverActions/getChat"
import { Metadata } from "next"

async function Chat({ params }: { params: { chat: string } }) {
  return (
    <ChatWrapper slideId={params.chat} />
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
      title = chat.slideName || slideId;
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