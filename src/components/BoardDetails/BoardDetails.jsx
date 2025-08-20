import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BoardDetails.css';
import PodcastList from '../PodcastList/PodcastList';
import DeleteBoardButton from '../DeleteBoardButton/DeleteBoardButton';

function BoardDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [podcasts, setPodcasts] = useState([]);

    useEffect(() => {
        async function getBoard() {
            const token = localStorage.getItem('token');
            const boardUrl = `${import.meta.env.VITE_BACK_END_SERVER_URL}/boards/${id}`;
            const podcastsUrl = `${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`;

            try {
                const boardRes = await axios.get(boardUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setBoard(boardRes.data);

                if (boardRes.data.podcasts && boardRes.data.podcasts.length > 0) {
                    const podcastsRes = await axios.get(podcastsUrl, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                const filteredPodcasts = podcastsRes.data.filter(podcast => boardRes.data.podcasts.includes(podcast._id));

                setPodcasts(filteredPodcasts);
                }
            } catch (error) {
                console.log(error.response?.data?.error || "Failed to fetch board");
            }
        }
        getBoard();
    }, [id]);

    if (!board) {
        return <p>Loading board...</p>
    }

    return (
        <div className="board-page">
            <div className="board-header">
                <h1 className="board-title">{board.name}</h1>
                {board.description && (
                    <p className="board-description">{board.description}</p>
                )}

                <div className="board-info">
                    {Array.isArray(board.tags) && board.tags.map(tag => (
                        <span className="tag" key={tag}>{tag}</span>
                    ))}

                    {typeof board.isPublic === 'boolean' && (
                        <span className={`status ${board.isPublic ? 'status-public' : 'status-private'}`}>
                            {board.isPublic ? 'Public' : 'Private'}
                        </span>
                    )}
                </div>

                <div className="board-buttons">
                    <button className="btn-edit" onClick={() => navigate(`/boards/${board._id}/edit`)}>Edit Board</button>
                    <DeleteBoardButton boardId={board._id}/>
                </div>
            </div>

            <div className="board-content">
                <PodcastList boardPodcasts={podcasts} />
            </div>
        </div>
    )
}

export default BoardDetails;