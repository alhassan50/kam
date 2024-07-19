import Link from "next/link"
import Arrow from "../shared/Arrow"
import { features } from "@/app/data/features"

const AboutKam = () => (
    <section className='grid gap-3'>
      <div className="">
        <h1 className="lg:w-[90%] mx-auto text-left">
          What is KAM - the <span className="text-">Knowledge Assessment Module?</span>
        </h1>
      </div>

      <p className='mt-8 text-left lg:w-[90%] mx-auto'>
      Sometimes it&apos;s hard to ask yourself the right questions. No study buddy! What do you do?
      Give up? Of course not, kam is always there for you. We generate the right questions for you. I mean just for you. We help you enjoy what you learn.
      </p>
     
      <p className='mt-2 text-left lg:w-[90%] mx-auto'>
        Kam is your go-to resource. We specialize in sparking curiosity and igniting that &apos;aha!&apos; moment. With Kam by your side, learning becomes not just a task, but a journey of discovery. Let us guide you through the twists and turns of knowledge, making every step enjoyable and every challenge conquerable.
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
                <Link href={feature.link} className="group hover:underline inline-block">
                  <h3 className="mt-5 flex gap-2 items-center">
                    Learn More

                    <div className="gro group-hover:translate-x-1 transition-all duration-150">
                      <Arrow applyColortheme={true} width={22} />
                    </div>
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