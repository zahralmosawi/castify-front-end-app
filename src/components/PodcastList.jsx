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
        <ul>
            {
                podcasts.map(podcast => {
                    return(
                        <>
                        <li>
                            <p>Podcast: {podcast.title}</p>
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
