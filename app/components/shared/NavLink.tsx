'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectisSideBarOpened } from '@/app/redux/slices/sideBarSlice';

function NavLink({link}: {link: Link}) {
    const pathname = usePathname()
    const isSideBarOpened = useSelector(selectisSideBarOpened)

  return (
    <div className={`capitalize group transition-all duration-200 hover:bg-hoverPrimary ${link.href === '/go-premium' && 'border-t border-b'}`}>
        <Link 
            href={link.href} 
            className={`py-3 px-6 min-w-full flex flex-nowrap items-center gap-2 ${link.href === pathname ? 'active-link' : null}`}
            title={link.title}
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
            
            <h3 className={`group-hover:font-medium whitespace-nowrap ${isSideBarOpened ? 'opacity-100' : 'opacity-0'}`}>
                {link.title}
            </h3>
        </Link>
    </div>
  )
}

export default NavLink