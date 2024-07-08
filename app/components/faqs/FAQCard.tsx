'use client'

import { useState } from 'react'

function FAQCard({index, faq}: {index: number, faq: FAQ}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
        className="p-5 border rounded-[4px] border-[var(--bg-card)] cursor-pointer hover:bg-[var(--hover-card)]"
        onClick={() => handleToggle(index)}
    >
        <div className="flex justify-between items-center gap-5">
            <h3>{faq.question}</h3>
            <figure className="text-lg">{openIndex === index ? '-' : '+'}</figure>
        </div>
        {openIndex === index && (
            <div>
            <hr className="border-[var(--bg-card)] my-5" />
            <p className='text-sm'>{faq.answer}</p>
            </div>
        )}
    </div>
  )
}

export default FAQCard