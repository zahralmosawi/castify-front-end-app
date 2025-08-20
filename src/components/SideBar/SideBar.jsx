import './SideBar.css';
import { Link } from 'react-router'
import { useLocation } from 'react-router-dom';
import { FaSearch, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const SideBar = ({showAuthLinks, onLogout}) => {
    return(
        <div className='sidebar'>
            {showAuthLinks ? (
                <>
                    <div className='authLinks'>
                    </div>
                </>
            )
            :
            (
                <>
                <div className='navbar'>
                    <Link to='/'><FaSearch style={{ marginRight: '8px' }} /> Explore </Link>
                    <Link to='/profile'><FaUser style={{ marginRight: '8px' }} /> Profile </Link>
                    <a href='#' onClick={event => {event.preventDefault(); onLogout();}}><FaSignOutAlt style={{ marginRight: '8px' }} /> Logout </a>
                </div>
                </>
            )
        }
        </div>
    )
}

export default SideBar