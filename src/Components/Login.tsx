import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessages, setErrorMessages] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        axios.get('http://localhost:3000/users')
            .then(result => {
                result.data.map((user : { email: string, password: string })  => {
                    if (user.email === formData.email) {
                        if (user.password === formData.password) {
                            alert('login seccesfully')
                            navigate('/dashboard')
                        } else {
                            setErrorMessages('password or email is not correct')

                        }
                    }
                })
            });

    }

    return (
        <div className='w-full flex flex-col gap-5 h-screen justify-center items-center' >
            <div className='bg-gray-50 px-5 py-5 w-[70%] md:w-[40%] rounded-sm shadow-lg border'>
                <h1 className='text-2xl text-gray-500 mb-6'>Login</h1>
                <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>

                    <div>
                        <label className='font-semibold' htmlFor="email">Email<span className='text-red-600'>*</span></label>
                        <input onChange={(event) => {
                            setFormData({ ...formData, email: event.target.value })
                        }} required id="email" className='p-2 w-full rounded-md border bg-transparent' type="email" placeholder='Enter Email' />
                    </div>
                    <div>
                        <label className='font-semibold' htmlFor="password">Password<span className='text-red-600'>*</span></label>
                        <input onChange={(event) => {
                            setFormData({ ...formData, password: event.target.value })
                        }} required id="password" className='p-2 w-full rounded-md border bg-transparent' type="password" placeholder='Enter Password' />
                        <p className='text-red-500'>{errorMessages}</p>
                    </div>
                    <div className={`flex justify-end`}>
                        <button className='bg-[#767cff] text-white px-5 py-1 rounded-md'>Login</button>
                    </div>
                </form>
            </div>
            <p>if you don't have account, please <NavLink to={'/registration'}> <span className='text-blue-500 underline'>Register</span></NavLink></p>
        </div>
    )
}

export default Login