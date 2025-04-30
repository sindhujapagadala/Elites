import React from 'react'
import { useState } from 'react';
import './LoginSignup.css';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        profilePic: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Logging in with:', { email: formData.email, password: formData.password });
        } else {
            console.log('Signing up with:', formData);
        }
    };

    return (
        <div className='container'>
            <div className='form-container'>
                <div className='form-toggle'>
                    <button 
                        className={isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button 
                        className={!isLogin ? 'active' : ''}
                        onClick={() => setIsLogin(false)}
                    >
                        Signup
                    </button>
                </div>
                
                <form className='form' onSubmit={handleSubmit}>
                    {isLogin ? (
                        <>
                            <h2>Welcome Back!</h2>
                            <input 
                                type="email" 
                                name="email"
                                placeholder='Email' 
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                type="password" 
                                name="password"
                                placeholder='Password' 
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <a href="#">Forgot Password?</a>
                            <button type="submit">Login</button>
                            <p>Not a Member? <a href='#' onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>Signup Now</a></p>
                        </>
                    ) : (
                        <>
                            <h2>Create Account</h2>
                            <input 
                                type="text" 
                                name="name"
                                placeholder='Full Name' 
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                type="email" 
                                name="email"
                                placeholder='Email' 
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                type="password" 
                                name="password"
                                placeholder='Password' 
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                type="password" 
                                name="confirmPassword"
                                placeholder='Confirm Password' 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <input 
                                type='file' 
                                name="profilePic"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            <button type="submit">Signup</button>
                            <p>Already have an account? <a href='#' onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>Login</a></p>
                        </>
                    )}
                </form>
            </div>
        </div>
    )
}