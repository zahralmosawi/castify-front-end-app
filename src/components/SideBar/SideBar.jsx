import './SideBar.css';
import { Link } from 'react-router'
import { useLocation } from 'react-router-dom';

const SideBar = ({showAuthLinks}) => {
    return(
        <div className='sidebar'>
            {showAuthLinks ? (
                <>
                    <div className='authLinks'>
                        <Link to='/signup'> Sign Up </Link>
                        <Link to='/login'> Login </Link>
                    </div>
                </>
            )
            :
            (
                <>
                <div className='navbar'>
                    <Link to='/podcasts'> Home </Link>
                    <Link to='/'> Explore </Link>
                    <Link to='/profile'> Profile </Link>
                </div>
                </>
            )
        }
        </div>
    )
}

export default SideBar