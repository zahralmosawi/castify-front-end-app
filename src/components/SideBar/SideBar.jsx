import { Link } from 'react-router'

const SideBar = () => {
    return(
        <>
        <Link to='/podcasts'> Home </Link>
        <Link to='/'> Explore </Link>
        <Link to='/profile'> Profile </Link>
        </>
    )
}

export default SideBar