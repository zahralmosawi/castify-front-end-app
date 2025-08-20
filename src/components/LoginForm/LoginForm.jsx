import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const res = await axios.post('http://localhost:3000/auth/login', {
                username,
                password
            })

            localStorage.setItem('token', res.data.token);
            onLogin(res.data.token);
            navigate('/podcasts');
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Login failed"})
        }
    }

    return (
        <div className="login-constainer">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Welcome Back</h2>
                <div className="form-group">
                    <input 
                        placeholder="Username"
                        value={username}
                        className="login-input"
                        onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        placeholder="Password"
                        type="password"
                        value={password}
                        className="login-input"
                        onChange={event => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit' className="login-button">Login</button>
                <Link to="/signup" style={{textAlign: 'center', display: 'block', marginTop: '1.5rem'}}>Don't have an account? Sign up</Link>
            </form>
        </div>
    )
}

export default LoginForm;