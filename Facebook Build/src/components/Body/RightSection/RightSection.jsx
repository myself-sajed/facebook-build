import { Card, } from '@mui/material'
import './RightSection.css'

const RightSection = () => {
    return (
        <div className="right__section" id='style-2'>

            <div className="right__section__icons">
                <span><b>Events</b></span>




                <Card elevation={2} className='right__section__card'>
                    <div className="event__card">
                        <img src={'/assets/RightSectionAssets/gift.png'} alt="" /><p><b>Birthdays</b></p>

                    </div>
                    <p><b>Sameer Don</b> and <b>8</b> others have birthdays today. </p>

                </Card>


                <span><b>Sponsored</b></span>

                <div className="image__with__name__sponsor">
                    <img src={'/assets/RightSectionAssets/sponsor1.jpg'} alt="" />
                    <div>
                        <span><b>Get Extra Marks!</b></span><br />
                        <a href="https://www.google.com">extramarks.com</a>
                    </div>
                </div>
                <div className="image__with__name__sponsor">
                    <img src={'/assets/RightSectionAssets/sponsor2.jpg'} alt="" />
                    <div>
                        <span><b>Get new walls</b></span><br />
                        <a href="https://www.google.com" >microsoft.com/wallapapers</a>
                    </div>
                </div>

                <span><b>Contacts</b></span>



                <div className="right__section__icons">

                    <div className="image__with__name">
                        <img className='right__avatar' src={'/assets/dp.jpeg'} alt="" />
                        <span><b>Shaikh Sajed</b></span>
                    </div>

                    <div className="image__with__name">
                        <img className='right__avatar' src={'/assets/dp.jpeg'} alt="" />
                        <span><b>Sameer Pathan</b></span>
                    </div>

                    <div className="image__with__name">
                        <img className='right__avatar' src={'/assets/dp.jpeg'} alt="" />
                        <span><b>Shaikh Parvez</b></span>
                    </div>

                    <div className="image__with__name">
                        <img className='right__avatar' src={'/assets/dp.jpeg'} alt="" />
                        <span><b>Rushikesh Sawale</b></span>
                    </div>

                    <div className="image__with__name">
                        <img className='right__avatar' src={'/assets/dp.jpeg'} alt="" />
                        <span><b>Ram Bhojwani</b></span>
                    </div>

                </div>



                <hr className="right__section__hr" />

                <p>Privacy  · Terms  · Advertising  · Ad Choices   · Cookies  ·   · Meta © 2022</p>


            </div>


        </div>
    )
}

export default RightSection