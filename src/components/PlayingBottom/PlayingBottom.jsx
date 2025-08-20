import PodcastPlayingContext from '../../Contexts/PodcastPlayingContext'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import './PlayingBottom.css';

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
        <div className='playing-bottom-container '>
            <img src={currentPodcast.podcastImage} alt={currentPodcast.title} width="70" />
            <p><strong>{currentPodcast.title} by {currentPodcast.creator}</strong></p>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    )
}

export default PlayingBottom