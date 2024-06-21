'use client'

import { usePathname } from 'next/navigation'
import { navLinks } from '@/app/data/navLinks'

function TitleBar() {
  const pathname = usePathname()
  const activeNavLink = navLinks.find(link => link.href === pathname)

  return (
    <div>
        <h3 className='font-medium capitalize'>
          {activeNavLink ? activeNavLink.title : 'Not Found'}
        </h3>
    </div>
  )
}

export default TitleBar