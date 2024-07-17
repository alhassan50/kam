import { Metadata } from "next";
import DefaultChatInterface from "@/app/components/my-tutor/DefaultChatInterface";

export const metadata: Metadata = {
  title: 'Tutor',
};

async function MyTutor() {
  //await new Promise((resolve) => setTimeout(resolve, 5000))

  return (
    <>
      <div className="p-0 h-full flex justify-center items-center">
        <DefaultChatInterface />
      </div>
    </>
  )
}

export default MyTutor