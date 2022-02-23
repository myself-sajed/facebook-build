import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import './LeftSection.css'

const LeftSection = () => {
    const user = useSelector(state => state.user.user)

    return (
        <div className="left__section" id='style-2'>

            <div className="left__section__icons">
                <div className="image__with__name">
                    <Avatar src={user.userData.photoURL}></Avatar>
                    <span><b>{user.userData.name}</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/friends.png'} alt="" />
                    <span><b>Friends</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/watch.png'} alt="" />
                    <span><b>Watch</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/memories.png'} alt="" />
                    <span><b>Memories</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/pages.png'} alt="" />
                    <span><b>Pages</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/groups.png'} alt="" />
                    <span><b>Groups</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/marketplace.png'} alt="" />
                    <span><b>Marketplace</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/saved.png'} alt="" />
                    <span><b>Saved</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/downarrow.svg'} alt="" />
                    <span><b>Show More</b></span>
                </div>

                <hr className="left__section__hr" />

                <span className='span__left__section'><b>Your Shortcuts</b></span>

                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/saved.png'} alt="" />
                    <span><b>Sameer Pathan</b></span>
                </div>
                <div className="image__with__name">
                    <img src={'/assets/LeftSectionAssets/saved.png'} alt="" />
                    <span><b>Mainmemerhoon</b></span>
                </div>
                <div className="image__with__name">
                    <img className='left__avatar' src={'/assets/dp.jpeg'} alt="" />
                    <span><b>Sajed Ahmed</b></span>
                </div>

                <hr className="left__section__hr" />

                <p>Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·   · Meta © 2022</p>


            </div>


        </div>
    )
}

export default LeftSection