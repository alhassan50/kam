import { Suspense } from "react"
import Spinner from "../shared/Spinner"
import NewChat from "./NewChat"

function NewChatWrapper() {
  return (
    <Suspense fallback={<Spinner />}>
        
    </Suspense>
  )
}

export default NewChatWrapper