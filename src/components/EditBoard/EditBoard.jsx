import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditBoard.css';

function EditBoard() {
    const {id} = useParams();

    const [form, setForm] = useState({
        name: '',
        description: '',
        isPublic: false,
        tags: '',
        podcasts: []
    });

    const [allPodcasts, setAllPodcasts] = useState([]);
    const [selectedPodcast, setSelectedPodcast] = useState([]);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getBoardDetails() {
            const token = localStorage.getItem('token');
            const boardUrl = `${import.meta.env.VITE_BACK_END_SERVER_URL}/boards/${id}`;
            const podcastsUrl = `${import.meta.env.VITE_BACK_END_SERVER_URL}/podcasts`;

            try {
                const boardRes = await axios.get(boardUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setForm({
                    name: boardRes.data.name,
                    description: boardRes.data.description,
                    isPublic: boardRes.data.isPublic,
                    tags: Array.isArray(boardRes.data.tags) ? boardRes.data.tags.join(', ') : boardRes.data.tags || '',
                    podcasts: boardRes.data.podcasts || []
                });

                setSelectedPodcast(boardRes.data.podcasts || []);

                const podcastsRes = await axios.get(podcastsUrl, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAllPodcasts(podcastsRes.data);
            } catch (error) {
                console.log(error.response?.data?.error || "Failed to load board.");
            }
        }

        getBoardDetails();
    }, [id]);

    function handlePodcastSelect(podcastId) {
        setSelectedPodcast(previous => previous.includes(podcastId) ? previous.filter(id => id !== podcastId) : [...previous, podcastId]);
    }

    function handleChange(event) {
        const {name, value, type, checked} = event.target;

        setForm(previous => ({...previous, [name]: type === 'checkbox' ? checked : value }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setSaving(true);

        const token = localStorage.getItem('token');

        try {
            await axios.put(`${import.meta.env.VITE_BACK_END_SERVER_URL}/boards/${id}`, {
                name: form.name,
                description: form.description,
                isPublic: form.isPublic,
                tags: form.tags.split(',').map(tag => tag.trim()),
                podcasts: selectedPodcast
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Board updated');
            navigate(`/boards/${id}`);
        } catch (error) {
            console.log(error.response?.data?.error || "Failed to update board.");
        }
    }

    return (
        <div className='container'>
            <form className="create-board-form" onSubmit={handleSubmit}>
                <h2>Edit Board</h2>

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
                    {allPodcasts.map(podcast => (
                        <li key={podcast._id} className="podcast-item">
                            <label className="podcast-label">
                                <input
                                    type="checkbox"
                                    checked={selectedPodcast.includes(podcast._id)}
                                    onChange={() => handlePodcastSelect(podcast._id)}
                                />
                                <img src={podcast.podcastImage} alt={podcast.title} width="50"/> {podcast.title}
                            </label>
                        </li>
                    ))}
                    </ul>
                </div>

                <button type="submit" className="submit-btn" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    )
}

export default EditBoard;