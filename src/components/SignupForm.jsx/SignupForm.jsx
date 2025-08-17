import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        bio: ''
    });

    const navigate = useNavigate();

    const handleChange = async event => {
        const {name, value} = event.target
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await axios.post('http://localhost:3000/auth/signup', {
                username, 
                password
            });

            alert('User registered, please login');
            navigate('/login');
        } catch (error) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            <input name="name" placeholder="Name" onChange={handleChange} />
            <textarea name="bio" placeholder="Bio" onChange={handleChange} />
            <button type="submit">Sign Up</button>
        </form>
    )
}

export default SignupForm;