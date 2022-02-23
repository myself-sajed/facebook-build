import { Card, IconButton } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'

const StoryCard = ({ openStoryModal, story, storyId, showStory }) => {

    const user = useSelector((state) => state.user.user)




    return (
        <Card className="middle__section__stories" onClick={() => { showStory(storyId) }}>
            <div className='stories__middle__section' style={{ zIndex: '3', height: '170px' }}>
                <Avatar style={{ margin: '5px', position: 'absolute', zIndex: '4' }} src={story.userWithStoryData.photoURL} className='avatar__story__other__user' />


                {
                    story.userWithStoryData.story ? story.userWithStoryData.storyData.story.storyImageURL ? <img className='story__images' src={story.userWithStoryData.storyData.story.storyImageURL} alt="" /> : 'No Image' : null
                }



            </div>
        </Card>
    )
}

export default StoryCard