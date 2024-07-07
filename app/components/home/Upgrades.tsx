import { upgrades } from "@/app/data/upgrades"

const Upgrades = () => (
    <section className="py-10 md:w-[90%] mx-auto grid gap-3">
      <h1 className="lg:text-center">
        What&apos;s Next for You? 
      </h1>

      <ul className="grid gap-5 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {upgrades.map(upgrade => (
          <li key={upgrade.title}>
            <div>
              <figure className="h-10 w-10 bg-black rounded">

              </figure>

              <h3 className="mt-2">
                {upgrade.title}
              </h3>

              <p className="mt-2 text-sm">
                {upgrade.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
)

export default Upgrades