import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between w-full p-[10px] bg-gray-700'>
      <div>Logo</div>
      <div className='w-1/5'>
        <ul className='flex w-full justify-between'>
            <li>Home</li>
            <li>Contact Us</li>
            <li>About</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
