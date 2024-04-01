"use client";
import Image from 'next/image'
import  Link from 'next/link'
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation'

const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <div className='w-screen h-16 bg-gray-700'>
      <div className='w-full h-full flex justify-between items-center'>
        <Image src="/icons/logo.svg" width={60} height={60} alt='Logo' />
        <div className='flex pr-4 gap-x-7 text-lg'>
        <Link href="/"  className={`hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out ${pathname === '/' ? 'text-blue-500' : 'text-white'}`}>Home</Link>
          <Link href="/healthAI"  className={`hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out ${pathname === '/healthAI' ? 'text-blue-500' : 'text-white'}`}>AI Health</Link>
          <Link href="/healthNews"  className={`hover:text-blue-500 font-semibold transition-all duration-300 ease-in-out ${pathname === '/healthNews' ? 'text-blue-500' : 'text-white'}`}>News</Link>
          <UserButton/>
        </div>
      </div>
    </div>
  )
}

export default DesktopNav
