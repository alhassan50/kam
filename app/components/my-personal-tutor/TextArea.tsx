import React from 'react'

function TextArea() {
  return (
    <form className="h-full flex gap-2 items-end sm:w-[95%] md:w-[80%] mx-auto border-[1px] border-[var(--bg-card)] rounded-lg">
        <textarea
            title=""
            placeholder="Ask your tutor anything..."
            className="w-full h-full outline-none text-sm bg-transparent resize-none p-5 "
        ></textarea>
        <div className="p-2">
            <button 
                type='button'
                className='bg-primary text-sm text-secondary px-4 py-2 font-medium rounded-[4px]'
            >
                Send
            </button>
        </div>
    </form>
  )
}

export default TextArea