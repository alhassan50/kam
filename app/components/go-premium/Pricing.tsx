import { plans } from '@/app/data/plans'
import React from 'react'
import PricingCard from './PricingCard'

function Pricing() {
  return (
    <section className='text-center'>
      <div className=''>
        <h2 className='capitalize'>
          Upgrade your learning
        </h2>

        <ul className='grid gap-5 lg:grid-cols-2 mt-10 text-left md:max-w-[95%] xl:max-w-[85%] 2xl:max-w-[80%] mx-auto'>
          {plans.map(plan => (
            <li 
              key={plan.name}
            >
              <PricingCard plan={plan} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Pricing