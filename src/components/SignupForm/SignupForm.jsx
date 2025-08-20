import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.css';

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
                username: formData.username,
                email: formData.email,
                password: formData.password,
                name: formData.name,
                bio: formData.bio
            });

            alert('User registered, please login'); //
            navigate('/login');
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Registration failed"})
        }
    }

    return (
        <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
            <h2>Sign Up</h2>

            <div className='form-group'>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            </div>

            <div className='form-group'>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>
            
            <div className='form-group'>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>

            <div className='form-group'>
            <input name="name" placeholder="Name" onChange={handleChange} />
            </div>

            <div className='form-group'>
            <textarea name="bio" placeholder="Bio" onChange={handleChange} />
            </div>

            <div className='singup-button'>
            <button type="submit">Sign Up</button>
            </div>
        </form>
        </div>
    )
}

export default SignupForm;