import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { getPodcast } from "../../../lib/podcast_api"
import PodcastPlayingContext from '../../Contexts/PodcastPlayingContext'
import './PodcastDetails.css'

const PodcastDetails = () => {
    const [podcast, setPodcast] = useState({})
    const { id } = useParams()
    const { playPodcast, isPlaying, currentPodcast } = useContext(PodcastPlayingContext)

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                const response = await getPodcast(id)
                setPodcast(response)
            } catch (error) {
                console.log(error)
                res.status(500).json({error: error.message})
                setPodcast(null)
            } 
        }
        fetchPodcast()
    }, [])

    const handlePlay = () => {
        playPodcast(podcast)
    }

    return (
        <div className="podcast-details-container">
            <h1>{podcast.title}</h1>
            <img src={podcast.podcastImage} alt={podcast.title} />
            <p>{podcast.creator}</p>
            <p>{podcast.description}</p>
            {
                podcast.audio_url?.url && (
                    <audio controls src={podcast.audio_url.url} 
                        onTimeUpdate={event => {
                            const currentTime = event.target.currentTime;
                            const duration = event.target.duration;

                            if (duration && currentTime < duration - 5) {
                                const progress = JSON.parse(localStorage.getItem('podcastProgress') || '{}');
                                progress[podcast._id] = currentTime;
                                localStorage.setItem('podcastProgress', JSON.stringify(progress));
                            } else if (duration && currentTime >= duration - 5) {
                                const progress = JSON.parse(localStorage.getItem('podcastProgress') || '{}');
                                delete progress[podcast._id];
                                localStorage.setItem('podcastProgress', JSON.stringify(progress));
                            }
                        }}
                    ></audio>
                )
            }
            <button onClick={handlePlay}>
                {isPlaying && currentPodcast?.id === podcast.id ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}

export default PodcastDetails