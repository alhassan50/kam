import Image from 'next/image'
import { Metadata } from 'next';
import { contactInfo } from '../data/contactInfo';
import ContactForm from '../components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
};

function Contact() {
  return (
    <main>
      <div className='grid gap-5 md:gap-10 lg:grid-cols-[1.2fr,.8fr]'>
        <section className="order-last lg:order-first">
          <article>
            <h1>Contact Us</h1>
            <p className='mt-5'>
              Welcome to our Contact Page. We&apos;re here to assist you with any questions or concerns you may have. Whether you need customer support, have feedback and suggestions, or have media inquiries, our team is ready to help. Feel free to reach out to us, and we&apos;ll get back to you as soon as possible. Your input and queries are important to us.
            </p>

            <div className='my-5 grid gap-2'>
              <div className='flex gap-2 items-center'>
                <figure>
                  <Image 
                    src={`/assets/images/contact-icon.svg`}
                    width={22}
                    height={22}
                    alt='tel'
                  />
                </figure>
                <h3>+233 123 456 789</h3>
              </div>
              
              <div className='flex gap-2 items-center'>
                <figure className='rounded-[50%] overflow-hidden'>
                  
                  <Image 
                    src={`/assets/images/email.svg`}
                    width={22}
                    height={22}
                    alt='tel'
                  />
                </figure>
                <h3>kam@gmail.com</h3>
              </div>
            </div>

            <ul className='grid sm:grid-cols-2 md:grid-cols-3 mt-5 gap-2'>
              {contactInfo.map(info => (
                <li 
                  className='p-4 border rounded-[4px] border-[var(--bg-card)] hover:bg-[var(--hover-card)]'
                  key={info.title}
                >
                  <h3>{info.title}</h3>

                  <p className='mt-2 text-[14px]'>{info.description}</p>
                </li>
              ))}
            </ul>
          </article>         
        </section>

        <ContactForm />
      </div>
    </main>
  )
}

export default Contact