import NewChat from "@/app/components/my-tutor/NewChat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Tutor',
};

function MyTutor() {
  //throw new Error()
  return (
    <NewChat />
  )
}

export default MyTutor