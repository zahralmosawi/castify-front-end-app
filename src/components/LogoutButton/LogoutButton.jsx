import {useNavigate} from 'react-router-dom';

function LogoutButton({onLogout}) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        onLogout();
        navigate('/login');
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default LogoutButton;