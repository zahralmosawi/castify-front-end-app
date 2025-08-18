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
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
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

                setAvatarPreview(res.data.avatar);
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

    function handleFile(event) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
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

            const data = new FormData();
            data.append('name', form.name);
            data.append('email', form.email);
            data.append('bio', form.bio);

            if (avatarFile) {
                data.append('avatar', avatarFile);
            }

            const res = await axios.put(url, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
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
            <h2>Edit Profile</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <img 
                        src={avatarPreview ? `${import.meta.env.VITE_BACK_END_SERVER_URL}${avatarPreview}` : undefined}
                        alt="Avatar Preview" 
                    />

                    <input 
                        id='avatar'
                        type='file'
                        accept='image/*'
                        onChange={handleFile}
                    />
                </div>

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
        </>
    )
}

export default EditProfile;