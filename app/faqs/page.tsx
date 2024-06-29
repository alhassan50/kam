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
        <p className='mt-2'>
          Find answers to the most common questions about the Knowledge Assessment Module (KAM). For further assistance, please contact our support team.
        </p>
      </div>
      <ul className="grid gap-3 mt-10">
        {faqs.map((faq, index) => (
          <li
            key={faq.question}
            className="p-5 border rounded-[4px] border-[rgba(255,255,255,0.2)] cursor-pointer hover:bg-[#2f2f2f]"
            onClick={() => handleToggle(index)}
          >
            <div className="flex justify-between">
              <h3>{faq.question}</h3>
              <figure className="text-lg">{openIndex === index ? '-' : '+'}</figure>
            </div>
            {openIndex === index && (
              <div>
                <hr className="border-[rgba(255,255,255,0.2)] my-5" />
                <p>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Faqs;
