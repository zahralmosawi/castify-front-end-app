import './EditProfile.css';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EditProfile() {
    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        bio: ""
    });

    const [userId, setUserId] = useState(null);
    const [saving, setSaving] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadProfile() {
            try {
                const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`;
                const token = localStorage.getItem('token');

                if (!token) {
                    return navigate('/login');
                }

                const res = await axios.get(url, {
                    headers: {Authorization: `Bearer ${token}`}
                });

                setForm({
                    username: res.data.username,
                    name: res.data.name,
                    bio: res.data.bio,
                    email: res.data.email
                });
                setUserId(res.data._id);
            } catch (error) {
                alert(error.response?.data?.error || "Failed to load profile.");
            }
        }

        loadProfile();
    }, [navigate]);

    function handleChange(event) {
        const { name, value } = event.target;
        setForm(previous => ({...previous, [name]: value}));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setSaving(true);

            const token = localStorage.getItem('token');

            if (!token) {
                return navigate('/login');
            }

            const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`;

            const data = {
                name: form.name,
                email: form.email,
                bio: form.bio
            };

            const res = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.data?.token) {
                localStorage.setItem('token', res.data.token);
            }

            alert('Profile Updated');
            navigate('/profile');
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to update profile.');
        }
    }
    
    return (
        <>
            <div className='main-content'>
                <div className='container'>
                    <h2>Edit Profile</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            name="username"
                            value={form.username}
                            readOnly
                            disabled
                        />

                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />

                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <textarea
                            name="bio"
                            placeholder="Bio"
                            value={form.bio}
                            onChange={handleChange}
                        />

                        <button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
                    </form>
                    <Link to='/changePassword'> Change Password </Link>
                </div>
            </div>
        </>
    )
}

export default EditProfile;