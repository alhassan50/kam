import DefaultChatInterface from "../components/my-personal-tutor/DefaultChatInterface"
import { redirect } from 'next/navigation'

async function MyPersonalTutor() {

  await new Promise((resolve) => setTimeout(resolve, 5000))
  
  /* redirect('?isNewChat=y') */

  return (
    <>
      <div className="p-0 h-full flex justify-center items-center">
        <DefaultChatInterface />
      </div>
    </>
  )
}

export default MyPersonalTutor