import { createContext, useContext, useState, useRef } from "react"

const PodcastPlayingContext = createContext() 

export const PodcastPlayingProvider = ({ children }) => {
    const [currentPodcast, setCurrentPodcast] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const podcastAudioRef = useRef(null)
    
    const playPodcast = (podcast) => {
        if (currentPodcast && currentPodcast.id === podcast.id) {
            setIsPlaying(!isPlaying)

            if (isPlaying){
            podcastAudioRef.current.pause()
            } else {
            podcastAudioRef.current.play()
            setCurrentPodcast(podcast) 
            }
        }else {
            if (podcastAudioRef.current) {
                podcastAudioRef.current.pause()
            }
            setCurrentPodcast(podcast)
            setIsPlaying(true)
        }
    }

    const pausePodcast = () => {
        if (podcastAudioRef.current) {
            podcastAudioRef.current.pause()
            setIsPlaying(false)
        }
    }

    const value = {
        currentPodcast,
        isPlaying,
        playPodcast,
        pausePodcast,
        podcastAudioRef
    }

    return (
        <PodcastPlayingContext.Provider value={{ currentPodcast, isPlaying, playPodcast, pausePodcast }}>
            {children}
            <audio ref={podcastAudioRef} src={currentPodcast?.audio_url?.url}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
            />
        </PodcastPlayingContext.Provider>
    )
}

export default PodcastPlayingContext

