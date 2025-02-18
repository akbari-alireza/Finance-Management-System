import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Registration: React.FC = () => {
    // const usenavigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userExpense: [],
        userIncome: []
    });
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Password does not match');
            return;
        }

        try {
            const result = await axios.get('http://localhost:3000/users');
            const userExists = result.data.some((user: { email: string }) => user.email === formData.email);

            if (userExists) {
                setErrorEmail('Email Already Exists');
                return;
            } else {
                await axios.post('http://localhost:3000/users', formData);
                alert('Registration Successful');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching users or during registration:', error);
        }
    }

    return (
        <div className='w-full flex flex-col gap-5 h-screen justify-center items-center'>
            <div className='bg-gray-50 px-5 py-5 w-[70%] md:w-[50%] rounded-sm shadow-lg border'>
                <h1 className='text-2xl text-gray-500 mb-6'>Create Your Account</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-between gap-5'>
                        <div className='flex flex-col w-[100%]'>
                            <label className='font-semibold' htmlFor="firstName">First Name<span className='text-red-600'>*</span></label>
                            <input
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                required
                                id="firstName"
                                className='p-2 rounded-md border bg-transparent w-[100%]'
                                type="text"
                                placeholder='Enter First Name'
                            />
                        </div>
                        <div className='flex flex-col w-[100%]'>
                            <label className='font-semibold' htmlFor="lastName">Last Name<span className='text-red-600'>*</span></label>
                            <input
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                required
                                id="lastName"
                                className='p-2 rounded-md border bg-transparent w-[100%]'
                                type="text"
                                placeholder='Enter Last Name'
                            />
                        </div>
                    </div>
                    <div>
                        <label className='font-semibold' htmlFor="email">Email<span className='text-red-600'>*</span>  <span className='text-red-500'>{errorEmail}</span></label>
                        <input
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            id="email"
                            className='p-2 w-full rounded-md border bg-transparent'
                            type="email"
                            placeholder='Enter Email'
                        />
                       
                    </div>
                    <div>
                        <label className='font-semibold' htmlFor="password">Password<span className='text-red-600'>*</span></label>
                        <input
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            id="password"
                            className='p-2 w-full rounded-md border bg-transparent'
                            type="password"
                            placeholder='Enter Password'
                        />
                    </div>
                    <div>
                        <label className='font-semibold' htmlFor="confirmPassword">Confirm Password<span className='text-red-600'>*</span> <span className={errorMessages === 'Correct' ? 'text-green-600' : 'text-red-500'}>{errorMessages}</span></label>
                        <input
                            onChange={(e) => {
                                setFormData({ ...formData, confirmPassword: e.target.value });
                                setErrorMessages(formData.password !== e.target.value ? 'Passwords do not match' : 'Correct');
                            }}
                            required
                            id="confirmPassword"
                            className='p-2 w-full rounded-md border bg-transparent'
                            type="password"
                            placeholder='Confirm Password'
                        />
                        
                    </div>
                    <div className={`flex justify-end`}>
                        <button className='bg-[#767cff] text-white px-5 py-1 rounded-md'>Sign Up</button>
                    </div>
                </form>
            </div>
            <p>If you have an account, please <NavLink to={'/login'}><span className='text-blue-500 underline'>Login Now</span></NavLink></p>
        </div>
    );
}

export default Registration;