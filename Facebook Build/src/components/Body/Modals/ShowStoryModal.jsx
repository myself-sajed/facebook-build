import { Avatar, Card, Divider, IconButton } from '@mui/material';
import React from 'react'
import './ShowStoryModal.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom'

const ShowStoryModal = ({ closeShowStoryModal, displayStoryData }) => {

    function navigateUser() {
        console.log('user navigated successfully')
    }


    return (

        <>

            <div className="create__post__modal__div" style={{ zIndex: '10' }}>
                <Card className="modal__body__content__div" style={{ padding: '0', backgroundColor: 'white', position: 'relative' }}>

                    {displayStoryData === null ? <div>Please wait...</div>
                        :

                        <>
                            <div className="progress">
                                <div className="progress__bar"></div>
                            </div>
                            <div className="story__user__info">

                                <div>
                                    <Avatar src={displayStoryData.storyData.photoURL} onClick={navigateUser} className="avatar__story__other__user" style={{ cursor: 'pointer' }} />


                                    <span style={{ cursor: 'pointer' }} onClick={navigateUser}><b >{displayStoryData.storyData.name}</b></span>
                                </div>
                                <IconButton onClick={closeShowStoryModal}><CloseRoundedIcon style={{ color: 'black' }} /></IconButton>

                            </div>

                            <div className="story__image__frame">
                                <img src={displayStoryData.storyData.storyData.story.storyImageURL} alt="" />
                            </div>


                            <div className="story__caption">
                                <span>{displayStoryData.storyData.storyData.story.caption}</span>

                            </div>
                        </>
                    }
                    <div className="shadow__div" style={{ boxShadow: '-1px -34px 61px 71px #000000', position: 'absolute', bottom: '-30px', width: '100%', height: '10px' }}>


                    </div>

                </Card>


            </div>

        </>
    )

}

export default ShowStoryModal;