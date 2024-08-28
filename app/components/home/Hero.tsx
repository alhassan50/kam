import Image from "next/image"
import Arrow from "../shared/Arrow"
import Link from "next/link"

const Hero = () => (
    <section className='text-center grid gap-3'>
      <h1 className="mx-auto">
        <span className="text-">Empower</span> Your Learning Journey with <br /> the <span className="text-">AI-Enhanced <span title="Knowledge Enhancement Module" className="cursor-pointer">KAM</span></span>
      </h1>

      <p className='mt-2'>
        Great learning comes with great tools. KAM is the best tool for us. Yep! Its that simple! 😃
      </p>

      <Link
          href='?login=y'
          className="btn-primary group flex justify-center items-center gap-2 mx-auto mt-5 px-10"
      >
          Get Started
          <div className="gro group-hover:translate-x-1 transition-all duration-150">
            <Arrow width={32} />
          </div>
      </Link>

      <figure className="relative mt-10 overflow-hidden max-w-[900px] mx-auto">
        {/* <div className="bg-[#0000008f] rounded-lg h-full w-full max-w-[1000px] mx-auto"></div> */}
        {/* <Image alt='hero' src={'/assets/images/hero.png'} width={1000} height={1000} /> */}
        <Image 
          alt='hero' 
          src={'/assets/images/hero.png'} 
          width={1000}
          height={1000}
          className="h-full w-full rounded-lg" 
        />
      </figure>
    </section>
  )

export default Hero