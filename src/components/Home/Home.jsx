import { useEffect, useState } from 'react';
import PodcastList from '../PodcastList/PodcastList';

function Home() {
    const [podcasts, setPodcasts] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [genres, setGenres] = useState({});
    const [continueListening, setContinueListening]= useState([]);

    useEffect(() => {
    async function getPodcasts() {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        const data = await res.json();
        setPodcasts(data);
        setFeatured(data.slice(0, 3));

        const progress = JSON.parse(localStorage.getItem('podcastProgress') || '{}');
        const continueList = data.filter(podcast => progress[podcast._id]);
        setContinueListening(continueList);
        }
        getPodcasts();
    }, []);

    return (
        <>
            <h2>Featured</h2>
            <PodcastList boardPodcasts={featured} />

            <h2>Continue Listening</h2>
            <PodcastList boardPodcasts={continueListening} />

            <h2>All Podcasts</h2>
            <PodcastList boardPodcasts={podcasts} />
        </>
    )
}

export default Home;