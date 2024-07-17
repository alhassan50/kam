import Arrow from "../shared/Arrow"

const Hero = () => (
    <section className='text-center grid gap-3'>
      <h1 className="mx-auto">
        <span className="text-">Empower</span> Your Learning Journey with <br /> the <span className="text-">AI-Enhanced <span title="Knowledge Enhancement Module" className="cursor-pointer">KAM</span></span>
      </h1>

      <p className='mt-2'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo aliquid illo labore libero dolorem, modi <br /> accusantium quos impedit asperiores ullam.
      </p>

      <button
          type="button"
          className="btn-primary flex justify-center items-center gap-2 mx-auto mt-5 px-10"
      >
          Get Started
          <Arrow width={32} />
      </button>

      <figure className="relative rounded h-[500px] mt-10 overflow-hidden">
        <div className="bg-[#0000008f] rounded-lg h-full w-full max-w-[1000px] mx-auto"></div>
      </figure>
    </section>
  )

export default Hero