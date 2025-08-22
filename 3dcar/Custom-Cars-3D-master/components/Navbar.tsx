import Link from 'next/link'
import { SignInButton, SignOutButton } from './buttons'
import AuthCheck from './AuthCheck'

export default function () {
    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b  bg-gray-800 backdrop-blur-lg transition-all'>
         <div className='flex h-14 items-center justify-between border-b'>
          <div  className='flex flex-row gap-5'>
              <Link
                href='/'
                className='flex z-40 font-semibold'>
                <span className='text-yellowImport'>HearthPaw</span>
              </Link>
              
              <Link
                href='/ar'
                className='flex z-40 font-medium text-white hover:text-yellow-400 transition-colors'>
                <span>AR Experience</span>
              </Link>
        </div>
        <SignInButton/>

          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
          </div>
          </nav>   
        )
}


