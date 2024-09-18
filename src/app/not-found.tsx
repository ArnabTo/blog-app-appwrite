import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center space-y-5'>
      <h1 className="text-6xl font-extrabold"><span>404!</span>Page not found</h1>
      <Button as={Link} href='/' className='font-semibold bg-textcolor text-primary px-5 rounded-md'>Go Home</Button>
    </div>
  )
}
