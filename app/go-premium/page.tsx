import React from 'react'
import { plans } from '../data/plans'
import { premiumAdvantages } from '../data/premiumAdvantages'
import Image from 'next/image'
import Arrow from '../components/shared/Arrow'
import PremiumPerks from '../components/go-premium/PremiumPerks'
import PricingCard from '../components/go-premium/PricingCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Premium',
};

function GoPremium() {
  const Hero = () => (
    <section className='text-center pt-10'>
      <div>
        <h1 className=''>
          Unlock Exclusive Features with KAM Premium 💎
        </h1>

        <p className='mt-2'>
          Upgrade to a premium account and take full advantage of our advanced tools and services.
        </p>

        <button
            type="button"
            className="btn-primary flex justify-center items-center gap-2 mx-auto mt-5 px-10"
        >
            Go Premium
            <Arrow width={32} />
        </button>
      </div>

      <PremiumPerks />
    </section>
  )

  const Pricing = () => (
    <section className='pt-20 text-center'>
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

  return (
    <main>
      <div>
        <Hero />
        <Pricing />
      </div>
    </main>
  )
}

export default GoPremium