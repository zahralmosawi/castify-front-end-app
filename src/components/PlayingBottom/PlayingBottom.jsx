import PodcastPlayingContext from '../../Contexts/PodcastPlayingContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom';

const PlayingBottom = () => {
    const { currentPodcast, isPlaying, playPodcast, pausePodcast } = useContext(PodcastPlayingContext)
    const location = useLocation()
    const token = localStorage.getItem('token');

    if (!token || location.pathname === '/login' || location.pathname === '/signup') {
        return null;
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