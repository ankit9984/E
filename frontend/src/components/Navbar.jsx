import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { FaBars } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { logoutSellerAsync } from '../api/sellerSlice';

function Navbar() {
    const dispatch = useDispatch();
    const {isAuthenticated, seller} = useSelector((state) => state.seller)
    const navigate = useNavigate();

    const [isProfile, setIsProfile] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

    const toggleProfile = () => {
        setIsProfile(!isProfile);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        // You can add logic here to toggle dark mode styles in your entire application
    };

    const handleLogout = () => {
        dispatch(logoutSellerAsync());
        navigate('/')
    }

    return (
        <nav className={`flex justify-between items-center h-16 shadow ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            {/* Left side of Navbar */}
            <div className='flex items-center ml-4'>
                <img className='w-10 h-10 mr-2' src={logo} alt="Logo" />
                <h1 className='text-xl font-bold'>ME</h1>
            </div>

            {/* Right side of Navbar */}
            <div className='flex items-center mr-4'>
                {/* Search bar */}
                <div className='relative'>
                    <input className={`rounded-md px-4 py-2 focus:outline-none border-2 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`} type="text" placeholder="Search..." />
                  
                </div>

                {/* Profile section */}
               {isAuthenticated ? (
                <div onClick={toggleProfile} className='ml-6 cursor-pointer' >
                    <img className='w-10 h-10 rounded-full' src={logo} alt="Profile" />
                </div>
               ) : (
                <div>
                    <Link to='/signup' className='bg-blue-600 p-2 rounded-lg text-white mr-2'>signUp</Link>
                    <Link to='/login' className='bg-green-500 p-2 rounded-lg text-white'>Login</Link>
                </div>
               )}

                {isProfile && (
                    <div className="absolute top-14 right-0 bg-white shadow-md rounded-md p-2">
                        <ul className=''>
                            {isAuthenticated ? <li>{seller.newSeller.firstName}</li> : ''}
                            <li className="cursor-pointer my-2">Profile</li>
                            <li className="cursor-pointer my-2">Settings</li>
                            <li onClick={handleLogout} className="cursor-pointer my-2">Logout</li>
                        </ul>
                    </div>
                )}

                {/* Dark mode toggle */}
                {/* <div className='ml-6 cursor-pointer' onClick={toggleDarkMode}>
                    {isDarkMode ? (
                        <svg className='h-6 w-6' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className='h-6 w-6' fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11a6 6 0 016-6h2a6 6 0 016 6v2a6 6 0 01-6 6h-2a6 6 0 01-6-6v-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )}
                </div> */}

                {/* Menu icon for mobile */}
                <div className='md:hidden ml-6'>
                    <FaBars className='h-6 w-6 cursor-pointer' />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
