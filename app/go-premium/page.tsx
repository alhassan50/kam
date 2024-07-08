import { Metadata } from 'next'
import Hero from '../components/go-premium/Hero'
import Pricing from '../components/go-premium/Pricing';

export const metadata: Metadata = {
  title: 'Go Premium',
};

function GoPremium() {
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