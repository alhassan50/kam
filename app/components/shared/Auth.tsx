import Link from "next/link"

function Auth() {
  return (
    <div>
        <Link
            href={'?login=y'}
            className='hover:underline text-sm'
        >
            Log In
        </Link>
        
        {/* <ProfileContainer /> */}
    </div>
  )
}

export default Auth