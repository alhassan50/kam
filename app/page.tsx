import { Metadata } from "next";
import Arrow from "./components/shared/Arrow";
import { features } from "./data/features";
import Link from "next/link";
import { testimonials } from "./data/testimonials";

export const metadata: Metadata = {
  title: 'Home | KAM',
};

export default function Home() {
  const Hero = () => (
    <section className='text-center pt-10 grid gap-3'>
      <h1 className="mx-auto">
        <span className="text-black">Empower</span> Your Learning Journey with <br /> the <span className="text-black">AI-Enhanced <span title="Knowledge Enhancement Module" className="cursor-pointer">KAM</span></span>
      </h1>

      <p className='mt-2'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo aliquid illo labore libero dolorem, modi <br /> accusantium quos impedit asperiores ullam.
      </p>

      <button
          type="button"
          className="btn-primary flex justify-center items-center gap-2 mx-auto mt-5 px-10"
      >
          Go Premium
          <Arrow width={32} />
      </button>

      <figure className="relative rounded h-[500px] mt-10 overflow-hidden">
        <div className="bg-[#0000008f] rounded-lg h-full w-full max-w-[1000px] mx-auto"></div>
      </figure>
    </section>
  )
  
  const AboutKam = () => (
    <section className='text-center pt-10 grid gap-3'>
      <h1 className="mx- text-left lg:text-center">
        What is the <span className="text-black">Knowledge Assessment Module?</span>
      </h1>

      <p className='mt-2 text-left lg:max-w-[90%] mx-auto'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat recusandae architecto nulla placeat. Eligendi natus laboriosam dolor illo. Aliquam nisi aperiam repellendus quod, est obcaecati dolor saepe reiciendis natus pariatur!
      </p>
     
      <p className='mt-2 text-left lg:max-w-[90%] mx-auto'>
        Accusantium aspernatur pariatur enim distinctio inventore itaque? Aliquid corporis odit quasi ratione nobis praesentium rerum adipisci consectetur asperiores nostrum? Esse laboriosam officia consectetur error excepturi laudantium deleniti, magni labore nostrum!
      </p>

      <ul className="grid gap-20 mt-10 lg:w-[90%] mx-auto">
        {features.map((feature, index) => (
          <li key={feature.title} className={`grid sm:grid-cols-2 gap-10`}>
            <div className={`text-left ${index%2 === 0 ? 'sm:order-1' : 'sm:order-2'}`}>
              <h2 className="">
                {feature.title}
              </h2>
              <p className="mt-3 lg:w-[80%]">
                {feature.description}
              </p>
              {feature.link && 
                <Link href={feature.link}>
                  <h3 className="mt-5 flex gap-2 items-center">
                    Learn More
                    <Arrow width={16} />
                  </h3>
                </Link>
              }
            </div>
            <figure className={`text-left ${index%2 === 0 ? 'sm:order-2' : 'sm:order-1'}`}>
              <div className="bg-[#0000008f] rounded-lg h-[300px] w-full max-w-[1000px] mx-auto"></div>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )

  const Testimonial = () => (
    <section className='text-center pt-10 md:w-[90%] mx-auto grid gap-3'>
      <h1 className="mx- text-left sm:text-center">
        <span className="text-black">KAM</span> Impacting Lives
      </h1>

      <ul className="grid gap-5 sm:grid-cols-2 mt-5">
        {testimonials.map(testimonial => (
          <li key={testimonial.feedback}>
            <div className="p-5 h-full flex flex-col justify-between border rounded border-[var(--bg-card)] hover:bg-[var(--hover-card)]">
              <p className="text-left text-sm">
                <svg className="inline-block h-4 w-6 rotate-180" height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M12 34h6l4-8v-12h-12v12h6zm16 0h6l4-8v-12h-12v12h6z"/><path d="M0 0h48v48h-48z" fill="none"/></svg>
                {testimonial.feedback}
              </p>
              <div className="flex gap-3 mt-5">
                <figure className="w-14 h-14 bg-black rounded-[50%]"></figure>
                <div>
                  <h3 className="text-left">
                    {testimonial.name}
                  </h3>

                  <p className="text-left text-xs">
                    {testimonial.college}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )

  return (
    <main>
      <div>
        <Hero />
        <AboutKam />
        <Testimonial />
      </div>
    </main>
  );
}
