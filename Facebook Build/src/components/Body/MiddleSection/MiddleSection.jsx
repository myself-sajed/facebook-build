import { Avatar, Divider } from '@mui/material';
import Card from '@mui/material/Card';
import './MiddleSection.css'
import PostCard from './PostCard';
import CreatePost from '../Modals/CreatePost';
import AddStory from '../Modals/AddStory';
import { useEffect, useState } from 'react';
import StoryCard from './StoryCard';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/slices/loaderSlice';
import Loader from '../Modals/Loader';
import { setStories } from '../../../redux/slices/storySlice';
import AdminStoryCard from '../Modals/AdminStoryCard';
import ShowStoryModal from '../Modals/ShowStoryModal';

const MiddleSection = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.loader.isLoading)
    const stories = useSelector((state) => state.stories.stories)


    // state for modal management
    const [modalOpen, setModalOpen] = useState(false);
    const [storyModalOpen, setStoryModalOpen] = useState(false);
    const [showStoryModalOpen, setShowStoryModalOpen] = useState(false)
    const [displayStoryData, setdisplayStoryData] = useState(null)
    const [storyTimeoutFunction, setstoryTimeoutFunction] = useState(null)

    //posts 
    const [posts, setPosts] = useState(null)
    const user = useSelector((state) => state.user.user)

    // For openinig the post modal
    function openCreatePostModal() {
        setModalOpen(true);

    }
    function closeCreatePostModal() {
        setModalOpen(false);
    }


    // For openinig the story modal
    function openStoryModal() {
        setStoryModalOpen(true);
    }
    function closeStoryModal() {
        setStoryModalOpen(false);
    }



    // For openinig the show story modal
    function openShowStoryModal() {
        setShowStoryModalOpen(true);
        const time = setTimeout(() => {
            closeShowStoryModal();
        }, 5000);
        setstoryTimeoutFunction(time)

    }
    function closeShowStoryModal() {
        clearTimeout(storyTimeoutFunction)
        setShowStoryModalOpen(false);
    }



    // fetch all the posts from the database
    useEffect(() => {

        dispatch(startLoading())
        const q = query(collection(db, "posts"), orderBy('timestamp', 'desc'));
        onSnapshot(q, (querySnapshot) => {
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ id: doc.id, data: doc.data() });
            });
            setPosts(posts);
            dispatch(stopLoading())
        });
    }, [])


    // fetch all the stories from the database
    useEffect(() => {
        const q = query(collection(db, "users"), where("story", "==", true));
        onSnapshot(q, (querySnapshot) => {
            const usersWithStory = [];
            querySnapshot.forEach((doc) => {
                if (doc.id === user.userId) {
                    return;
                }
                usersWithStory.push({ userWithStoryId: doc.id, userWithStoryData: doc.data() });
            });
            dispatch(setStories(usersWithStory))
        });
    }, [])

    // Show the stories after a click on the story card
    function showStory(userId) {
        onSnapshot(doc(db, "users", userId), (doc) => {
            setdisplayStoryData({ storyUserId: doc.id, storyData: doc.data() })
        });
        openShowStoryModal()
    }

    return (
        <>
            <div className="middle__section">


                {showStoryModalOpen ? <ShowStoryModal displayStoryData={displayStoryData} closeShowStoryModal={closeShowStoryModal} /> : null}

                {/* STORIES */}
                <div className="story__section">

                    {/* Reserved for the current user  */}
                    <AdminStoryCard openStoryModal={openStoryModal} showStory={showStory} />
                    {/* Reserved for the current user  */}

                    {stories && stories.map((story, index) => {
                        if (index > 3) {
                            return null

                        }
                        else return <StoryCard key={story.userWithStoryId} openStoryModal={openStoryModal} story={story} storyId={story.userWithStoryId} showStory={showStory} isAdmin={false} />
                    })}


                    {stories && stories.length > 4 ? <img src={'/assets/MiddleSectionAssets/right.svg'} className='view__stories__icon' alt='right' /> : null}

                </div>

                {/* CREATE POST CARD */}

                {modalOpen ? <CreatePost closeCreatePostModal={closeCreatePostModal} /> : null}
                {storyModalOpen ? <AddStory closeStoryModal={closeStoryModal} /> : null}

                <Card className="middle__create__post__card" >
                    {isLoading ? <Loader /> : null}

                    <div className="middle__create__post">
                        <div className="image__input__div">
                            <Avatar src={user.userData.photoURL} />
                            <input type="text" onClick={openCreatePostModal} value='' readOnly placeholder={`What's on your mind, ${user.userData.name}?`} size='32' />
                        </div>

                        <Divider />

                        <div className="create__post__icons">
                            <div className="single__images">
                                <img src={'/assets/MiddleSectionAssets/live-video.svg'} className="live__video" alt="" />
                                <span>Live Video</span>
                            </div>
                            <div className="single__images">
                                <img src={'/assets/MiddleSectionAssets/photo.svg'} className="photo__video" alt="" />
                                <span>Photo/Video</span>
                            </div>
                            <div className="single__images">
                                <img src={'/assets/MiddleSectionAssets/feeling.svg'} className="feeling" alt="" />
                                <span>Feeling/Activity</span>
                            </div>
                        </div>
                    </div>

                </Card>

                {/* POST FEED */}
                <div className="feed__post__container" style={{ marginRight: '32px' }}>

                    {posts && posts.map(post => {
                        return <PostCard key={post.id} post={post.data} postId={post.id} />
                    })}

                    <br />
                </div>




            </div>
        </>
    )
}

export default MiddleSection