import './Home.css'
import { useEffect, useState } from 'react';
import PodcastList from '../PodcastList/PodcastList';

function Home() {
    const [podcasts, setPodcasts] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [genres, setGenres] = useState({});
    const [continueListening, setContinueListening]= useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getPodcasts() {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });

            const data = await res.json();
            setPodcasts(data);
            setFeatured(data.slice(0, 5));

            const progress = JSON.parse(localStorage.getItem('podcastProgress') || '{}');
            const continueList = data.filter(podcast => progress[podcast._id]);
            setContinueListening(continueList);
        }
        getPodcasts();
    }, []);

    const filteredPodcasts = podcasts.filter(podcast =>
        podcast.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container">
            <br/><br/>
            <input
                type='text'
                className="searchInput"
                placeholder='Search Podcasts'
                value={search}
                onChange={event => setSearch(event.target.value)}
            />

            {search.trim() ? (
                <PodcastList boardPodcasts={filteredPodcasts} />
            ) : (
                <>
                    <div className="section">
                        <div className="sectionTitle">Featured</div>
                        <PodcastList boardPodcasts={featured} />
                    </div>

                    <div className="section">
                        <div className="sectionTitle">Continue Listening</div>
                        <PodcastList boardPodcasts={continueListening} />
                    </div>

                    <div className="section">
                        <div className="sectionTitle">All Podcasts</div>
                        <PodcastList boardPodcasts={filteredPodcasts} />
                    </div>
                </>
            )}
        </div>
    )
}

export default Home;