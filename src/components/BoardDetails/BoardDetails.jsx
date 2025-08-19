import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PodcastList from '../PodcastList/PodcastList';

function BoardDetails() {
    const { id } = useParams();
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
                alert(error.response?.data?.error || "Failed to fetch board");
            }
        }
        getBoard();
    }, [id]);

    if (!board) {
        return <p>Loading board...</p>
    }

    return (
        <div>
            <h2>{board.name}</h2>
            <p>{board.description}</p>
            <PodcastList boardPodcasts={podcasts} />
        </div>
    )
}

export default BoardDetails;