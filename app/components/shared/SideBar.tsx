'use client'

import { navLinks } from '@/app/data/navLinks';
import NavLink from './NavLink';
import ThemeColor from './ThemeColor';
import { selectisSideBarOpened, toggleSideBar } from '@/app/redux/slices/sideBarSlice';
import { useDispatch, useSelector } from 'react-redux';

function SideBar() {
  const isSideBarOpened = useSelector(selectisSideBarOpened);
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      dispatch(toggleSideBar());
    }
  };

  return (
    <div className={`${isSideBarOpened ? 'w-[250px] border-r' : 'w-[0px] md:w-[85px] border-r-0 md:border-r'} fixed overflow-hidden h-[calc(100vh-53px)] bg-sideBarBg width-transition z-50`}>
      <div className={`w-[250px] h-full bg-sideBarBg pt-2`}>
        <ul className=''>
          {navLinks.map(link => (
            <li key={link.href} onClick={handleLinkClick}>
              <NavLink link={link} />
            </li>
          ))}
        </ul>
        <ThemeColor />
      </div>
      <div
        onClick={() => dispatch(toggleSideBar())}
        className={`fixed top-0 left-0 w-full h-full -z-10 bg-[rgba(0,0,0,0.6)] ${isSideBarOpened ? 'block' : 'hidden'} md:hidden`}
      ></div>
    </div>
  );
}

export default SideBar;
