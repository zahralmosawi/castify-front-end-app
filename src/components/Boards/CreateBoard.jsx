import './CreateBoard.css';
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
        <div className='container'>
            <form className="create-board-form" onSubmit={handleSubmit}>
                <h2>Create New Board</h2>

                <div className="form-group">
                    <label htmlFor="name">Board Name</label>
                    <input name="name" placeholder="Board Name" onChange={handleChange} value={form.name} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} />
                </div>

                <div className="form-group inline">
                    <label htmlFor="isPublic">Make Board Public</label>
                    <input type="checkbox" name="isPublic" onChange={handleChange} checked={form.isPublic} />
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <input name="tags" placeholder="technology, design, news" onChange={handleChange} value={form.tags} />
                </div>
                
                <div className="form-group">
                    <label>Select Podcast</label>
                    <ul className="podcast-list">
                    {podcasts.map(podcast => (
                        <li key={podcast._id} className="podcast-item">
                            <label className="podcast-label">
                                <input type="checkbox" checked={selectedPodcast.includes(podcast._id)} onChange={()=>handlePodcastSelect(podcast._id)}/>
                                <img src={podcast.podcastImage} alt={podcast.title} width="50"/> {podcast.title}
                            </label>
                        </li>
                    ))}
                </ul>
                </div>

                
                

                <button type="submit" className="submit-btn">Create Board</button>
            </form>
        </div>
    )
}

export default CreateBoard;