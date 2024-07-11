import React from 'react'

function ChatList() {
  return (
    <button 
        type="button"
        title="Select slides" 
        className="blur-bg flex items-center gap-1 h-full p-2 hover:bg-[var(--hover-card)] rounded backdrop-blur border border-[var(--bg-card)]"
    >
        <h3 className="text-sm max-w-[120px] whitespace-nowrap overflow-hidden overflow-ellipsis">
            Information Systems
        </h3>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M11.341 4.747a1 1 0 0 1 1.318 0l4 3.5a1 1 0 1 1-1.317 1.506L12 6.829 8.659 9.753a1 1 0 0 1-1.317-1.506l4-3.5Zm-4.095 9.61a1 1 0 0 1 1.41-.096L12 17.174l3.343-2.913a1 1 0 1 1 1.314 1.508l-4 3.485a1 1 0 0 1-1.314 0l-4-3.485a1 1 0 0 1-.097-1.411Z" clip-rule="evenodd"></path>
        </svg>
    </button>
  )
}

export default ChatList