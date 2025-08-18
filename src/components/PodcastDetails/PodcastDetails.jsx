import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getPodcast } from "../../../lib/podcast_api"

const PodcastDetails = () => {
    const [podcast, setPodcast] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                const response = await getPodcast(id)
                setPodcast(response)
            } catch (error) {
                console.error(error)
                setPodcast(null)
            } 
        }
        fetchPodcast()
    }, [])

    return (
        <div>
            <h1>{podcast.title}</h1>
            <img src={podcast.podcastImage} alt={podcast.title} width="400" />
            <p>{podcast.creator}</p>
            <p>{podcast.description}</p>
            {
                podcast.audio_url?.url && (
                    <audio controls src={podcast.audio_url.url}></audio>
                )
            }
        </div>
    )
}

export default PodcastDetails