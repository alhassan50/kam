import Link from 'next/link'

function CloseModal({closeDialgue}: {closeDialgue: () => void}) {
  return (
    <Link href='/my-personal-tutor'>
        <button
            type="button"
            onClick={() => closeDialgue()} 
            className="bg-primary h-6 w-6 flex justify-center items-center rounded-full text-secondary"
        >
            x
        </button>
    </Link>
  )
}

export default CloseModal