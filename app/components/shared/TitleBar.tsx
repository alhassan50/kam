'use client'
import { usePathname } from 'next/navigation';
import { navLinks } from '@/app/data/navLinks';

function TitleBar() {
  const pathname = usePathname();
  const activeNavLink = navLinks.find(link => link.href === pathname);

  let nestedActiveLink = null;

  if (!activeNavLink) {
    const myTutorRegex = /^\/my-tutor\/.*/;
    // Special case for /my-tutor dynamic routes
    if (pathname.match(myTutorRegex)) {
      // Extract the dynamic part from the pathname
      const parts = pathname.split('/');
      nestedActiveLink = parts[2]; // Adjust index based on your routing structure
    }
  }

  // Function to format the nestedActiveLink
  const formatNestedLink = (link: string) => {
    if (!link) return 'Not Found';
    // Convert to lowercase and replace hyphens with spaces
    return decodeURIComponent(link.charAt(0).toUpperCase() + link.slice(1).replace(/-/g, ' '))
  };

  return (
    <div className='hidden md:block' title={activeNavLink?.title || formatNestedLink(nestedActiveLink || '')}>
        <h3 className='font-medium capitalize text-sm  max-w-[220px] whitespace-nowrap overflow-hidden overflow-ellipsis mx-auto'>
          {activeNavLink ? activeNavLink.title : nestedActiveLink ? formatNestedLink(nestedActiveLink) : 'Not Found'}
        </h3>
    </div>
  );
}

export default TitleBar;
