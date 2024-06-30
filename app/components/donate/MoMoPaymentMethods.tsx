import Image from "next/image"

function MoMoPaymentMethods() {
  return (
    <>
        <p className='mt-2'>
            We accept MoMo payment from the following networks:
        </p>
        <div className="flex gap-2 mt-3">
            <figure 
                title="Vodafone"
                className="bg-white overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
                <Image
                src={'/assets/images/voda.png'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[72px] h-auto"
                />
            </figure>

            <figure 
                title="MTN"
                className="bg-yellow-500 overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
                <Image
                src={'/assets/images/mtn.svg'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[48px] h-auto"
                />
            </figure>
            
            <figure 
                title="AirtelTigo"
                className="bg-[#fff] overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
                <Image
                src={'/assets/images/at.png'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[72px] h-auto"
                />
            </figure>
            
            <figure 
                title="AirtelTigo"
                className="bg-[green] overflow-hidden group flex justify-center items-center rounded-[4px] p-2 cursor-pointer"
            >
                <Image
                src={'/assets/images/glo.png'}
                width={100}
                height={100}
                alt="mtn"
                className="group-hover:scale-[1.1] transition-all duration-200 w-[48px] h-auto"
                />
            </figure>
        </div>
    </>
  )
}

export default MoMoPaymentMethods