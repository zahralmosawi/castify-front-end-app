import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBoard() {
    const [form, setForm] = useState({
        name: '',
        description: '',
        isPublic: false,
        tage: ''
    });

    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value, type, checked} = event.target;

        setForm(previous => ({...previous, [name]: type === 'checkbox' ? checked : value}));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const res = await axios.post(`${import.meta.env.VITE_BACK_END_SERVER_URL}/boards`, {
                ...form,
                tags: form.tags.split(',').map(tag => tag.trim())
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

                <button type="submit">Create Board</button>
            </form>
        </>
    )
}

export default CreateBoard;