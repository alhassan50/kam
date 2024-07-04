import { premiumAdvantages } from '@/app/data/premiumAdvantages'

function PremiumPerks() {
  return (
    <ul className='grid gap-5 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 mt-14 md:max-w-[95%] mx-auto text-left'>
        {premiumAdvantages.map(advantage => (
          <li
            key={advantage.title}
          >
            <figure className='w-full rounded-[4px] h-[200px] bg-[#0000008f]'>
              {/* <Image
                alt={advantage.title}
                width={100}
                height={100}
                src={'/assets/images/email.svg'}
              /> */}
            </figure>
            
            <div className='mt-3'>
              <h3>
                {advantage.title}
              </h3>

              <p className='mt-1 text-sm'>
                {advantage.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
  )
}

export default PremiumPerks