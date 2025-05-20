import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
 
export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
      <Button variant={'default'}>some shit</Button>
    </div>
  )
}