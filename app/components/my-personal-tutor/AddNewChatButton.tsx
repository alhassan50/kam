import Link from "next/link"

function AddNewChatButton() {
  return (
    <Link href={'?isNewChat=y'} passHref>
        <button
            type="button"
            title="Add slides" 
            className="blur-bg flex items-center gap-1 h-full p-2 hover:bg-[var(--hover-card)] rounded backdrop-blur border border-[var(--bg-card)]"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z" clip-rule="evenodd"></path>
            </svg>
    </button>
    </Link>
  )
}

export default AddNewChatButton