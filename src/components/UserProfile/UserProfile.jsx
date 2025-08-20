import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [boards, setBoards] = useState([]);
    const [podcasts, setPodcasts] = useState([]);
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

                const podcastRes = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setPodcasts(podcastRes.data);
            } catch (error) {
                console.log(error)
                res.status(500).json({error: "Failed to fetch profile"})
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

    function getBoardCover(board) {
        if (board.podcasts && board.podcasts.length > 0) {
            const firstPodcastId = board.podcasts[0];
            const podcast = podcasts.find(podcast => podcast._id === firstPodcastId);
            return podcast?.podcastImage;
        }

        return "https://res.cloudinary.com/dvhwvkip4/image/upload/v1755620759/4259aa6cd08633d53bb8698ca0c2451f_kdogdp.jpg";
    }

    return (
        <>
            <div className='container'>
                <div className="profile-container">
                    <div className="profile-card">
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-username">@{user.username}</p>
                        <p className="profile-email">{user.email}</p>
                        <p className="profile-bio">{user.bio}</p>

                        <div className="profile-buttons">
                        <button onClick={() => navigate('/profile/edit')} className="edit-btn">Edit Profile</button>
                        <button onClick={() => navigate('/boards/new')} className="create-btn">+ Create New Board</button>
                        </div>
                    </div>

                    <div className="boards-section">
                        {boards.length === 0 ? (
                            <p className="no-boards">Start by creating a board</p>
                        ) : (
                            <ul className="boards-grid">
                                {boards.map(board => (
                                    <li key={board._id} className="board-card">
                                        <img
                                            src={getBoardCover(board)}
                                            alt="Board Cover"
                                            className="board-cover"
                                        />
                                        <Link to={`/boards/${board._id}`} className="board-name">
                                            {board.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default UserProfile;