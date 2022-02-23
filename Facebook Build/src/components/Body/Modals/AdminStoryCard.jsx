import { Card, IconButton } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'

const AdminStoryCard = ({ openStoryModal, showStory }) => {

    const user = useSelector((state) => state.user.user)

    // add story
    function addStory() {
        openStoryModal()
    }


    return (
        <Card className="middle__section__stories" >
            <div className='stories__middle__section' style={{ zIndex: '3', height: '170px' }}>
                <Avatar style={{ margin: '5px', position: 'absolute', zIndex: '4', }}
                    src={user.userData.photoURL} className='avatar__story__admin' />



                {
                    user.userData.story ? user.userData.storyData.story.storyImageURL ? <img className='story__images__admin' onClick={() => { showStory(user.userId) }} src={user.userData.storyData.story.storyImageURL} style={{ height: '60%' }} alt="" /> : 'No Image' : null
                }

                <div className="addStoryDiv" style={{ marginLeft: '1%', }}>
                    <IconButton style={{ marginTop: '9%', marginLeft: '42%', marginBottom: '-10px' }} onClick={addStory}><AddCircleOutlineOutlinedIcon
                        style={{ fontSize: '28px' }} color='primary' className='add__to__story' />
                    </IconButton>
                    <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '16px' }}>Add a story</p>
                </div>


            </div>
        </Card>
    )
}

export default AdminStoryCard