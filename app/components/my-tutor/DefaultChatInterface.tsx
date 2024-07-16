import React from 'react'

async function DefaultChatInterface() {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  return (
    <div>
        <h2 className='text-center leading-normal'>
            Hello 👋🏽, I am your Personal Tutor! <br /> How can I help you today?
        </h2>
    </div>
  )
}

export default DefaultChatInterface