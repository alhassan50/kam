'use client'

import { navLinks } from '@/app/data/navLinks';
import NavLink from './NavLink';
import ThemeColor from './ThemeColor';
import { selectisSideBarOpened } from '@/app/redux/slices/sideBarSlice';
import { useSelector } from 'react-redux';

function SideBar() {
    const isSideBarOpened = useSelector(selectisSideBarOpened)
  return (
    <div className={`${isSideBarOpened ? 'w-[250px] border-r' : 'w-[0px] md:w-[85px] border-r-0 md:border-r'} fixed overflow-hidden  h-[calc(100vh-53px)] bg-sideBarBg pt-2 width-transition`}>
        <div className={`w-[250px] h-full`}>
            <ul className=''>
                {navLinks.map(link => (
                    <li 
                        key={link.href}
                    >
                        <NavLink link={link} />
                    </li>
                ))}
            </ul>        
            <ThemeColor />
        </div>
    </div>
  )
}

export default SideBar