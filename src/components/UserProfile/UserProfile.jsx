import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [boards, setBoards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function getProfile() {
            try {
                const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/profile`;
                const token = localStorage.getItem('token');

                if (!token) {
                    navigate('/login');
                    return;
                }

                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}`}
                });

                setUser(res.data);

                const boardRes = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/boards`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userBoards = boardRes.data.filter(board => board.createdBy === res.data._id);
                setBoards(userBoards);
            } catch (error) {
                alert(error.response?.data?.error || "Failed to fetch profile");
            }
        }

        getProfile();
    }, [navigate])

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
                            src={user.avatar ? `${import.meta.env.VITE_BACK_END_SERVER_URL}${user.avatar}` : undefined}
                            alt='User Avatar'
                        />
                    </label>

                    <h2>{user.name}</h2>
                    <p>@{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.bio}</p>

                    <button onClick={() => navigate('/profile/edit')}>Edit Profile</button>
                    <button onClick={() => navigate('/boards/new')}>+ Create New Board</button>
                </div>

                <div className='boards-list'>
                    {boards.length === 0 ? (
                        <p>Start by creating a board</p>
                    )
                    :
                    (
                        <ul>
                            {boards.map(board => (
                                <li key={board._id}>
                                    <strong>{board.name}</strong>
                                    <p>{board.description}</p>
                                </li>
                            ))}
                        </ul>
                    )
                
                }
                </div>
            </div>
        </>
    )
}

export default UserProfile;