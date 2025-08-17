import axios from 'axios'
import { useState, useEffect } from 'react'

const PodcastList = () => {
    const [podcasts, setPodcasts] = useState([])

    const getAllPodcast = async () => {
        const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`
        const res = await axios.get(url) 
        setPodcasts(res.data)
    }

    useEffect(()=>{
        getAllPodcast()
    }, [])

  return (
    <div>
        <ul style={{listStyle: "none"}}>
            {
                podcasts.map(podcast => {
                    return(
                        <>
                        <li>
                            <img src={podcast.podcastImage} alt={podcast.title} width="200"/>
                            <p><strong>{podcast.title}</strong></p>
                            <p>Creator: {podcast.creator}</p>
                        </li>
                        </>
                    )
                })
            }
        </ul>
    </div>
  )
}

export default PodcastList
