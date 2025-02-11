import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='h-16 w-full bg-[#767cff] font-semibold font-sans px-10 justify-between text-white flex items-center'>
      <div>
        Logo
      </div>
      <div className='flex flex-row gap-5 text-[14px] lg:text-[16px]'>
        <NavLink
          to={'/dashboard'}
          className={({ isActive }) =>
            isActive ? 'bg-white text-[#767cff] px-3 py-1 rounded-sm' : 'px-3 py-1 rounded-sm text-white hover:bg-white hover:text-[#767cff]'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? 'bg-white text-[#767cff] px-3 py-1 rounded-sm' : 'px-3 py-1 rounded-sm text-white hover:bg-white  hover:text-[#767cff]'
          }
        >
          Income
        </NavLink>
        <NavLink
          to={'/expense'}
          className={({ isActive }) =>
            isActive ? 'bg-white text-[#767cff] px-3 py-1 rounded-sm' : 'px-3 py-1 rounded-sm text-white hover:bg-white hover:text-[#767cff]'
          }
        >
          Expense
        </NavLink>
      </div>
      <div className='flex gap-1'>
        <NavLink
          to={'/login'} className={({ isActive }) =>
            isActive ? 'bg-white text-[#767cff] px-3 py-1 rounded-sm' : 'px-3 py-1 rounded-sm text-white hover:bg-white hover:text-[#767cff]'
          }>
          Login
        </NavLink>
        <NavLink
          to={'/registration'} className={({ isActive }) =>
            isActive ? 'bg-white text-[#767cff] px-3 py-1 rounded-sm' : 'px-3 py-1 rounded-sm text-white hover:bg-white hover:text-[#767cff]'
          }>
          Sign Up
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar;