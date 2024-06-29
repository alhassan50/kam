'use client'

import { useState } from 'react';
import { faqs } from '../data/faqs';

function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main>
      <div>
        <h1>Frequently Asked Questions</h1>
        <p className='mt-2 font-extralight'>
          Find answers to the most common questions about the Knowledge Assessment Module (KAM). For further assistance, please contact our support team.
        </p>
      </div>
      <ul className="grid gap-3 mt-10">
        {faqs.map((faq, index) => (
          <li
            key={faq.question}
            className="p-5 border rounded-[4px] border-[var(--bg-card)] cursor-pointer hover:bg-[var(--hover-card)]"
            onClick={() => handleToggle(index)}
          >
            <div className="flex justify-between gap-5">
              <h3>{faq.question}</h3>
              <figure className="text-lg">{openIndex === index ? '-' : '+'}</figure>
            </div>
            {openIndex === index && (
              <div>
                <hr className="border-[var(--bg-card)] my-5" />
                <p className='font-extralight'>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Faqs;
