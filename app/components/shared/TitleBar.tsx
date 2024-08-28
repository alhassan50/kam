'use client'
import { usePathname } from 'next/navigation';
import { navLinks } from '@/app/data/navLinks';
import { validLinks } from '@/app/data/validLinks';

function TitleBar() {
  const pathname = usePathname();
  const activeNavLink = navLinks.find(link => link.href === pathname) || validLinks.find(link => link.href === pathname);

  let nestedActiveLink = null;

  if (!activeNavLink) {
    // Updated Regex for handling nested dynamic routes under practice-exam
    const myTutorRegex = /^\/my-tutor\/.*/;
    const practiceExamRegex = /^\/practice-exam(\/.*)?$/; // Updated regex for deeper dynamic routes

    if (pathname.match(myTutorRegex) || pathname.match(practiceExamRegex)) {
      // Extract the dynamic part from the pathname
      const parts = pathname.split('/');
      nestedActiveLink = parts.slice(2).join(' : '); // Adjusted for multi-level paths
      nestedActiveLink = nestedActiveLink.replace('mcq', 'MCQ')
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
