import Link from 'next/link'

function CloseModal({closeDialgue}: {closeDialgue: () => void}) {
  return (
      <button
          type="button"
          onClick={() => closeDialgue()} 
          className="bg-primary h-6 w-6 flex justify-center items-center rounded-full text-secondary"
      >
          x
      </button>
  )
}

export default CloseModal