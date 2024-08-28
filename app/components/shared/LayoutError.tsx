import Link from 'next/link'
 
export default function LayoutError({errorType}: {errorType: 'default' | 'other'}) {
  return (
    <div className='flex justify-center items-center flex-col gap-1'>
        {errorType === 'default' ? 
        <PageLoadError /> : null}
    </div>
  )
}

const PageLoadError = () => (
  <div>
    <h2>Error Loading Page</h2>
    <p className='mt-2 text-lg'>We&apos;re sorry, but something went wrong while loading this page.</p>
    <p className='mt-4 text-base'><strong>What Can You Do?</strong></p>
    <ul className='text-left mt-2 grid gap-1'>
      <li><small className='font-extralight text-[14px]'>- Refresh the Page: Sometimes, a simple refresh can fix the issue.</small></li>
      <li><small className='font-extralight text-[14px]'>- Check Your Internet Connection: Ensure that you have a stable internet connection.</small></li>
      <li><small className='font-extralight text-[14px]'>- Try Again Later: There may be a temporary issue on our end. Please try again in a few minutes.</small></li>
    </ul>
      {/* <h2>An Unexpected Error occurred!</h2>
      <Link href="/">Return Home</Link>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link> */}
  </div>
)