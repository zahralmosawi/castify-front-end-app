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

    const avatarImages = [
        "https://res.cloudinary.com/dvhwvkip4/image/upload/v1755698117/3da40ec9631f142c2719639892fff081_vdl1c7.jpg",
        "https://res.cloudinary.com/dvhwvkip4/image/upload/v1755698117/f63fb740d8122a7233a2e92fff672077_joehiq.jpg",
        "https://res.cloudinary.com/dvhwvkip4/image/upload/v1755698117/15e5da640fe35d6122350347f146d588_esc23l.jpg",
        "https://res.cloudinary.com/dvhwvkip4/image/upload/v1755698118/cd2badcbc611e6eaf574f2634ff74355_kjstka.jpg"
    ];

    const handleChange = async event => {
        const {name, value} = event.target
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async event => {
        event.preventDefault();

        const avatarUrl = avatarImages[Math.floor(Math.random() * avatarImages.length)];

        try {
            await axios.post('http://localhost:3000/auth/signup', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                name: formData.name,
                bio: formData.bio,
                avatar: avatarUrl
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