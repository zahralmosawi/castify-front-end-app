import PodcastPlayingContext from '../../Contexts/PodcastPlayingContext'
import { useContext } from 'react'

const PlayingBottom = () => {
    const { currentPodcast, isPlaying, playPodcast, pausePodcast } = useContext(PodcastPlayingContext)

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
            <p><strong>{currentPodcast.title} by {currentPodcast.crator}</strong></p>
            <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        </div>
    )
}

export default PlayingBottom