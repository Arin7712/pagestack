import React from 'react'
import { ModeToggle } from './ModeToggle'
import Link from 'next/link'
import { navItems } from '@/lib/constants'
import { buttonVariants } from './ui/button'

const Navbar = () => {
  return (
    <main className='flex items-center justify-between md:px-[4rem] px-6 py-3 border-b'>
      <h1 className="text-lg">PageStack</h1>
      <div className='md:flex hidden items-center gap-10'>
        {
            navItems.map((item, index) => (
                <Link key={index} href={item.href}>{item.name}</Link>
            ))
        }
      </div>
      <div className='flex items-center justify-center gap-6'>
      <ModeToggle/>
      <Link href="/create" className={buttonVariants()}>Get started</Link>
      </div>
    </main>
  )
}

export default Navbar
