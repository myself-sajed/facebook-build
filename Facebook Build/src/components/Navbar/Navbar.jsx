import SearchIcon from '@mui/icons-material/Search';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { Avatar, Card, IconButton } from '@mui/material';
import WidgetsRoundedIcon from '@mui/icons-material/WidgetsRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setIsUser, setRandom, setUser } from '../../redux/slices/userSlice';
import { stopLoading } from '../../redux/slices/loaderSlice';

const Navbar = () => {

    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    function logoutUser() {
        dispatch(setRandom(Math.random() * 100))
        localStorage.removeItem('token')
        window.location.reload()
        dispatch(stopLoading())
    }
    return (
        <Card className="navbar" sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
            <div className="navbar__left">

                <img src={'/favicon.ico'} style={{ width: '40px', height: '40px' }} alt="" />
                <div className="navbar__search__wrapper">
                    <SearchIcon />
                    <input type="search" size='20' placeholder="Search Facebook" />
                </div>

            </div>
            <div className="navbar__middle">
                <div className="navbar__middle__icon__div active-tab">
                    <IconButton className='navbar__middle__icons '><HomeRoundedIcon sx={{ fontSize: 30 }} /></IconButton>
                </div>

                <div className="navbar__middle__icon__div">
                    <IconButton className='navbar__middle__icons'><OndemandVideoRoundedIcon sx={{ fontSize: 30 }} /></IconButton>
                </div>

                <div className="navbar__middle__icon__div">
                    <IconButton className='navbar__middle__icons'><StoreRoundedIcon sx={{ fontSize: 30 }} /></IconButton>
                </div>

                <div className="navbar__middle__icon__div">
                    <IconButton className='navbar__middle__icons'><GroupsRoundedIcon sx={{ fontSize: 30 }} /></IconButton>
                </div>



            </div>
            <div className="navbar__right">
                <div className="navbar__avatar">

                    <Avatar src={user.userData.photoURL}>
                    </Avatar>
                    <span><b>{user.userData.name}</b></span>

                </div>
                <IconButton><WidgetsRoundedIcon sx={{ fontSize: 25 }} /></IconButton>
                <IconButton><MessageRoundedIcon sx={{ fontSize: 25 }} /></IconButton>
                <IconButton><NotificationsRoundedIcon sx={{ fontSize: 25 }} /></IconButton>
                <IconButton onClick={() => { logoutUser() }} ><LogoutRoundedIcon sx={{ fontSize: 25 }} /></IconButton>


            </div>
        </Card>
    )
}

export default Navbar