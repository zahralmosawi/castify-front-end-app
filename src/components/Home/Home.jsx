import { useEffect, useState } from 'react';
import PodcastList from '../PodcastList/PodcastList';

function Home() {
    const [podcasts, setPodcasts] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [genres, setGenres] = useState({});

    useEffect(() => {
    async function getPodcasts() {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        const data = await res.json();
        setPodcasts(data);
        setFeatured(data.slice(0, 3));

        const genreMap = {};
        data.forEach(podcast => {
            if (podcast.tags && Array.isArray(podcast.tags)) {
            podcast.tags.forEach(tag => {
                if (!genreMap[tag]) genreMap[tag] = [];
                genreMap[tag].push(podcast);
            });
            }
        });
        setGenres(genreMap);
        }
        getPodcasts();
    }, []);

    return (
        <>
            <h2>Featured</h2>
            <PodcastList boardPodcasts={featured} />

            <h2>All Podcasts</h2>
            <PodcastList boardPodcasts={podcasts} />
        </>
    )
}

export default Home;