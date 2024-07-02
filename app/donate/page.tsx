import { Metadata } from "next";
import MoMoPaymentMethods from "../components/donate/MoMoPaymentMethods";
import DonateForm from "../components/donate/DonateForm";

export const metadata: Metadata = {
  title: 'Donate',
};

function Donate() {
  return (
    <main>
      <h1>Support Our Mission</h1>
      <div className='grid gap-5 md:gap-10 lg:grid-cols-2 mt-10'>
        <section className="">
          <article>
            <p className=''>
              Your generosity helps us continue our mission to provide quality education and resources through the Knowledge Assessment Module (KAM). Your donation will directly contribute to the development of new features, maintenance of our platform, and support for students and educators around the world. Every contribution, no matter the size, makes a significant impact.
            </p>
            <p className='mt-2'>
              Thank you for considering a donation to KAM. Together, we can make a difference in the lives of many.
            </p>
          </article>
          
          <MoMoPaymentMethods />         
        </section>
        
        <DonateForm />
      </div>
    </main>
  )
}

export default Donate;
