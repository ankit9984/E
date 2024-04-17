import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { registerSellerAsync } from '../api/sellerSlice';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    
    const dispatch = useDispatch();
    const {isLoading, error} = useSelector((state) => state.seller);

    const handleChange = async (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setFormData({...formData, [name]: value})
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerSellerAsync(formData))
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl mb-4 font-bold text-center">Seller Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    {isLoading ? 'Registering...' : 'Register'}
                </button>
                {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
            </form>
        </div>
    )
}

export default Register
