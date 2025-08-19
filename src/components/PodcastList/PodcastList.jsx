import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router'

const PodcastList = ({boardPodcasts}) => {
    const [podcasts, setPodcasts] = useState([])

    useEffect(() => {
        if (boardPodcasts) {
            setPodcasts(boardPodcasts);
        } else {
            const getAllPodcast = async () => {
                const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`
                const token = localStorage.getItem('token');

                const res = await axios.get(url, {
                     headers: { Authorization: `Bearer ${token}`}
                }) 

                setPodcasts(res.data)
            }
            getAllPodcast();
        }
    }, [boardPodcasts])

    if (boardPodcasts && boardPodcasts.length === 0) {
        return (
            <p>No Podcasts Added Yet</p>
        )
    }

  return (
    <>
        <ul style={{listStyle: "none"}}>
            {
                podcasts.map(podcast => {
                    return(
                        <>
                        <li>
                            <Link to={`/podcasts/${podcast._id}`}><img src={podcast.podcastImage} alt={podcast.title} width="200"/></Link>
                            <p><strong>{podcast.title}</strong></p>
                            <p>Creator: {podcast.creator}</p>
                        </li>
                        </>
                    )
                })
            }
        </ul>
    </>
  )
}

export default PodcastList
