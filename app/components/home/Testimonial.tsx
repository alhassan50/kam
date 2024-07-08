import { testimonials } from "@/app/data/testimonials"

const Testimonial = () => (
    <section className='text-center py-10 md:w-[90%] mx-auto grid gap-3'>
      <h1 className="mx- text-left sm:text-center">
        <span className="text-black">KAM</span> Impacting Lives
      </h1>

      <ul className="grid gap-5 sm:grid-cols-2 mt-8">
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

export default Testimonial