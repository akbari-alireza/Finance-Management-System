import axios from 'axios';
import React from 'react'
import { FaUser } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const deleteAccountHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    try {
        const user = JSON.parse(sessionStorage.getItem("user") || "{}");
        if (!user.id) {
            console.error("User not found!");
            return;
        }

        // دریافت اطلاعات کاربر
        const res = await axios.get(`http://localhost:3000/users/${user.id}`);
        if (!res.data) {
            console.error("User data not found!");
            return;
        }

        // حذف کاربر
        await axios.delete(`http://localhost:3000/users/${user.id}`);

        // پاک کردن sessionStorage و هدایت به صفحه ورود
        sessionStorage.removeItem("user");
        navigate('/login');

    } catch (error) {
        console.error("Error deleting account:", error);
    }
};

  return (
    <div className='h-16 w-full bg-[#767cff] items-center justify-center flex'>
      <div className='font-semibold font-sans px-10 max-w-[1300px] w-full justify-between text-white flex items-center'>
        <div className='cursor-pointer'>
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
            to={'/incomes'}
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
        <div className="relative group cursor-pointer">
          <div className="flex gap-1 items-center">
            <FaUser />
          </div>
          <div className="absolute group-hover:flex flex-col hidden text-[10px] gap-2 bg-white text-black w-[100px] right-[-30px] rounded  p-2 top-[20px]">
            <NavLink className='hover:bg-slate-200 p-1' to={'/login'}>
              Log Out
            </NavLink>
            <p onClick={deleteAccountHandler} className='hover:bg-slate-200 p-1'>Delete Account</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Navbar;