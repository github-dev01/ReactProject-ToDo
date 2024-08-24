import React from 'react'

function Navbar() {
  return (
    <div className='bg-slate-900 text-white'>
        <nav className='container flex justify-around m-auto py-1'>
            <div className='font-bold text-xl cursor-pointer'>
                myToDo
            </div>
            <div>
                <ul className='flex gap-4 font-medium'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>About</li>
                    <li className='cursor-pointer'>Log-in</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar