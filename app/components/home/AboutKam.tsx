import Link from "next/link"
import Arrow from "../shared/Arrow"
import { features } from "@/app/data/features"

const AboutKam = () => (
    <section className='grid gap-3'>
      <div className="">
        <h1 className="lg:w-[90%] mx-auto text-left">
          What is the <span className="text-black">Knowledge Assessment Module?</span>
        </h1>
      </div>

      <p className='mt-8 text-left lg:w-[90%] mx-auto'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat recusandae architecto nulla placeat. Eligendi natus laboriosam dolor illo. Aliquam nisi aperiam repellendus quod, est obcaecati dolor saepe reiciendis natus pariatur!
      </p>
     
      <p className='mt-2 text-left lg:w-[90%] mx-auto'>
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
                <Link href={feature.link} className="hover:underline">
                  <h3 className="mt-5 flex gap-2 items-center">
                    Learn More
                    <Arrow applyColortheme={true} width={16} />
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

export default AboutKam