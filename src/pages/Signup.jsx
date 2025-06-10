import React, { useState } from 'react';
import { signup } from '../api/userApi';

export default function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await signup(data);
      alert(response.data);
    } catch (error) {
      alert(error.response?.data || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="userName" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="profileImage" type="file" onChange={handleChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
