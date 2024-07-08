import PremiumPerks from './PremiumPerks'
import Arrow from '../shared/Arrow'

const Hero = () => (
    <section className='text-center'>
      <div>
        <h1 className=''>
          Unlock Exclusive Features with KAM Premium
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

export default Hero