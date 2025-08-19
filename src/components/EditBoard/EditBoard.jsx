import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditBoard() {
    const {id} = useParams();

    const [form, setForm] = useState({
        name: '',
        description: '',
        isPublic: false,
        tags: ''
    });

    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getBoardDetails() {
            const token = localStorage.getItem('token');
            const url = `${import.meta.env.VITE_BACK_END_SERVER_URL}/boards/${id}`;

            try {
                const res = await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setForm({
                    name: res.data.name,
                    description: res.data.description,
                    isPublic: res.data.isPublic,
                    tags: Array.isArray(res.data.tags) ? res.data.tags.join(', ') : res.data.tags || ''
                });
            } catch (error) {
                alert(error.response?.data?.error || "Failed to load board.");
            }
        }

        getBoardDetails();
    }, [id]);

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
                tags: form.tags.split(',').map(tag => tag.trim())
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Board updated');
            navigate(`/boards/${id}`);
        } catch (error) {
            alert(error.response?.data?.error || "Failed to update board.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Board</h2>

            <input name="name" placeholder="Board Name" value={form.name || ""} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={form.description || ""} onChange={handleChange} />
            <label>Public</label>
            <input type="checkbox" name="isPublic" checked={form.isPublic} onChange={handleChange} />
            <input name="tags" placeholder="Tags" value={form.tags || ""} onChange={handleChange} />

            <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
    )
}

export default EditBoard;