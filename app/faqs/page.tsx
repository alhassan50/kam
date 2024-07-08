import { faqs } from '../data/faqs';
import FAQCard from '../components/faqs/FAQCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
};

function Faqs() {
  return (
    <main>
      <section>
        <h1>Frequently Asked Questions</h1>
        <p className='mt-2'>
          Find answers to the most common questions about the Knowledge Assessment Module (KAM). For further assistance, please contact our support team.
        </p>
      </section>
      <ul className="grid gap-3">
        {faqs.map((faq, index) => (
          <li
            key={faq.question}
            
          >
            <FAQCard
              index={index} 
              faq={faq}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Faqs;
