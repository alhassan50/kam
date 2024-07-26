import LayoutError from '@/app/components/my-tutor/LayoutError'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <LayoutError errorType='default' />
    </div>
  )
}