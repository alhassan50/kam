function PricingCard({plan}: {plan: Plan}) {
  return (
    <div
        className={`p-5 xl:p-10 rounded-[4px] max-w-[500px] mx-auto border border-[var(--bg-card)] hover:bg-[var(--hover-card)] ${plan.recommended && 'bg-black text-white border-black hover:bg-[var(--prem-card-bg)]'}`}
        >
        <h3 className='text-xl'>
            {plan.name} {plan.recommended && '💎'}
        </h3>

        <div className='my-7 h-[.1px] bg-[var(--bg-card)] '></div>
        
        <div>
            <ul className='grid gap-4'>
            {plan.features.map(feature => (
                <li 
                key={feature.feature.name}
                className='flex gap-2 items-center'  
                >
                {feature.supported ?
                    <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z" fill="green" fillRule="evenodd"/></svg>
                    :
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className='w-[20px]'><path d="M 7.21875 5.78125 L 5.78125 7.21875 L 14.5625 16 L 5.78125 24.78125 L 7.21875 26.21875 L 16 17.4375 L 24.78125 26.21875 L 26.21875 24.78125 L 17.4375 16 L 26.21875 7.21875 L 24.78125 5.78125 L 16 14.5625 Z" fill='red'/></svg>
                }
                <p>{feature.feature.name}</p>
                </li>
            ))}
            </ul>

            <div>
                <h1 
                    title={`${plan.price} ghana cedis per ${plan.duration}`}
                    className='my-5'>¢{plan.price}/{plan.duration}</h1>
            </div>
                
            <button 
            className={`w-full p-3 rounded-[4px] border md:max-w-[200px] ${plan.recommended ? 'border-white hover:bg-white hover:text-black' : 'border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-[var(--secondary-color)]'}`}
            type='button'
            >
                Choose Plan
            </button>
        </div>
    </div>
  )
}

export default PricingCard