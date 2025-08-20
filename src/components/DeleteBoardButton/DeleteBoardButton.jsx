import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DeleteBoardButton({boardId}) {
    const navigate = useNavigate();

    async function handleDelete() {
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`${import.meta.env.VITE_BACK_END_SERVER_URL}/boards/${boardId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Board deleted'); //
            navigate('/profile');
        } catch (error) {
            console.log(error)
            res.status(500).json({error: "Failed to delete board"})
        }
    }

    return (
        <>
            <button onClick={handleDelete} className='btn-delete'>Delete Board</button>
        </>
    )
}

export default DeleteBoardButton;