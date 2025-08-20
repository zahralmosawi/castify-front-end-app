import PodcastPlayingContext from '../../Contexts/PodcastPlayingContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const PlayingBottom = () => {
    const { currentPodcast, isPlaying, playPodcast, pausePodcast } = useContext(PodcastPlayingContext)
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/login');
        return;
    }

    if (!currentPodcast) {
        return null 
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            pausePodcast()
        } else {
            playPodcast(currentPodcast)
        }
    }

    return (
        <div>
            <h3>Now Playing</h3>
            <img src={currentPodcast.podcastImage} alt={currentPodcast.title} width="70" />
            <p><strong>{currentPodcast.title} by {currentPodcast.creator}</strong></p>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    )
}

export default PlayingBottom