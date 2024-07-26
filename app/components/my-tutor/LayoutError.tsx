import Link from 'next/link'
 
export default function LayoutError({errorType}: {errorType: 'default' | 'other'}) {
  return (
    <main className='flex justify-center items-center flex-col gap-1'>
        {errorType === 'default' ? 
        <PageLoadError /> : null}
    </main>
  )
}

const PageLoadError = () => (
  <div>
    <h2>Error Loading Page</h2>
    <p className='mt-1'>We&apos;re sorry, but something went wrong while loading this page.</p>
    <p className='mt-4'><strong>What Can You Do?</strong></p>
    <ul className='text-left'>
      <li><small>- Refresh the Page: Sometimes, a simple refresh can fix the issue.</small></li>
      <li><small>- Check Your Internet Connection: Ensure that you have a stable internet connection.</small></li>
      <li><small>- Try Again Later: There may be a temporary issue on our end. Please try again in a few minutes.</small></li>
    </ul>
      {/* <h2>An Unexpected Error occurred!</h2>
      <Link href="/">Return Home</Link>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link> */}
  </div>
)