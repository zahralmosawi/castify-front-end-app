import { useState, useEffect, use} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBoard() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        isPublic: false,
        tags: '',
        podcasts: []
    })

    const [podcasts, setPodcasts] = useState([])
    const [selectedPodcast, setSelectedPodcast] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get(`${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setPodcasts(res.data)
            }catch (error) {
                console.error("Failed", error)
            }
        }
            fetchPodcasts()
        }, [])
        
        function handlePodcastSelect(id){
            console.log("Clicked podcast id:", id)
            setSelectedPodcast(prev =>
            prev.includes(id)
                ? prev.filter(podcastId => podcastId !== id)
                : [...prev, id]
            )
        }

    function handleChange(event) {
        const {name, value, type, checked} = event.target;

        setForm(previous => ({...previous, [name]: type === 'checkbox' ? checked : value}));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(`${import.meta.env.VITE_BACK_END_SERVER_URL}/boards/new`, {
                ...form,
                tags: form.tags.split(',').map(tag => tag.trim()),
                podcasts: selectedPodcast
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            navigate('/profile');
        } catch (error) {
            alert(error.response?.data?.error || "Board creation failed");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Create New Board</h2>

                <input name="name" placeholder="Board Name" onChange={handleChange} value={form.name} required />
                <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} />
                <label>Public</label>
                <input type="checkbox" name="isPublic" onChange={handleChange} checked={form.isPublic} />
                <input name="tags" placeholder="Tags" onChange={handleChange} value={form.tags} />

                <label>Select Podcast</label>
                <ul>
                    {podcasts.map(podcast => (
                        <li key={podcast._id}>
                            <label>
                                <input type="checkbox" checked={selectedPodcast.includes(podcast._id)} onChange={()=>handlePodcastSelect(podcast._id)}/>
                                <img src={podcast.podcastImage} alt={podcast.title} width="50"/> {podcast.title}
                            </label>
                        </li>
                    ))}
                </ul>

                <button type="submit">Create Board</button>
            </form>
        </>
    )
}

export default CreateBoard;