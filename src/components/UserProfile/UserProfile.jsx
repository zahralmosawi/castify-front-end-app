import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {
            try {
                const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`;
                const token = localStorage.getItem('token');

                if(!token) {
                    navigate('/login');
                    return;
                }

                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}`}
                });

                setUser(res.data);
            } catch (error) {
                alert(err.response?.data?.error || "Failed to fetch profile");
            }
        }

        getProfile();
    }, [navigate]);

    if (!user) {
        return (
            <>
                <p>Loading Profile...</p>
            </>
        )
    }

    return (
        <>
            <div className='profile-container'>
                <div className='profile-form'>
                    <label className='avatar-wrapper'>
                        <img 
                            id='avatarPreview'
                            src={user.avatar}
                            alt='User Avatar'
                        />
                    </label>

                    <h2>{user.name}</h2>
                    <p>@{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.bio}</p>

                    <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
                </div>
            </div>
        </>
    )
}

export default UserProfile;