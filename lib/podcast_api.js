import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACK_END_SERVER_URL

const getPodcast = async (podcastId) => {
    try{
        const url = `${baseUrl}/podcasts/${podcastId}`
        const token = localStorage.getItem('token')
        const res = await axios.get(url) 

        return res.data 

    }catch(error){
        return error
    }
}

export {getPodcast}