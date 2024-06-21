import { navLinks } from '@/app/data/navLinks';
import NavLink from './NavLink';
import ThemeColor from './ThemeColor';

function SideBar() {
  return (
    <div className='w-[250px] h-[calc(100vh-53px)] bg-[#fafafa] border-r pt-2'>
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
  )
}

export default SideBar