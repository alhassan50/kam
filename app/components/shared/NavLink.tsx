import Link from 'next/link'
import Image from 'next/image'

type Link = {
    title: string;
    href: string;
    icon: string;
}

function NavLink({link}: {link: Link}) {
  return (
    <div className={`capitalize group transition-all duration-200 hover:bg-tertiary ${link.href === '/go-premium' && 'border-t border-b'}`}>
        <Link 
            href={link.href} 
            className='py-3 px-6 min-w-full flex items-center gap-2'
        >
            <figure className='w-7 h-7 group-hover:scale-125 transition-all duration-200 rounded-[4px]'>
                <Image 
                    src={link.icon}
                    width={32}
                    height={32}
                    alt=''
                    className=''
                />
            </figure>
            
            <h3 className='gro group-hover:font-medium'>
                {link.title}
            </h3>
        </Link>
    </div>
  )
}

export default NavLink