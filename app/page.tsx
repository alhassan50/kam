import { Metadata } from "next";
import Arrow from "./components/shared/Arrow";
import { features } from "./data/features";
import Link from "next/link";

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
      <h1 className="mx- text-left sm:text-center">
        What is the <span className="text-black">Knowledge Assessment Module?</span>
      </h1>

      <p className='mt-2 text-left md:max-w-[90%] mx-auto'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat recusandae architecto nulla placeat. Eligendi natus laboriosam dolor illo. Aliquam nisi aperiam repellendus quod, est obcaecati dolor saepe reiciendis natus pariatur!
      </p>
     
      <p className='mt-2 text-left md:max-w-[90%] mx-auto'>
        Accusantium aspernatur pariatur enim distinctio inventore itaque? Aliquid corporis odit quasi ratione nobis praesentium rerum adipisci consectetur asperiores nostrum? Esse laboriosam officia consectetur error excepturi laudantium deleniti, magni labore nostrum!
      </p>

      <ul className="grid gap-20 mt-10 md:w-[90%] mx-auto">
        {features.map((feature, index) => (
          <li key={feature.title} className={`grid sm:grid-cols-2 gap-10`}>
            <div className={`text-left ${index%2 === 0 ? 'sm:order-1' : 'sm:order-2'}`}>
              <h2 className="">
                {feature.title}
              </h2>
              <p className="mt-3 md:w-[80%]">
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
  return (
    <main>
      <div>
        <Hero />
        <AboutKam />
      </div>
    </main>
  );
}
