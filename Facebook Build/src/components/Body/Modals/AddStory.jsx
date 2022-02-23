import { Button, Card, IconButton } from "@mui/material";
import './CreatePost.css'
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useRef, useState } from "react";
import { serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { startLoading, stopLoading } from '../../../redux/slices/loaderSlice';
import { Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';



function AddStory({ closeStoryModal }) {

    const user = useSelector(state => state.user.user)

    // States for creating a post
    const [postImageURL, setPostImageURL] = useState(null);
    const [postActualImageURL, setPostActualImageURL] = useState(null);
    const [caption, setCaption] = useState('');
    const captionRef = useRef()
    const dispatch = useDispatch()


    // for focusing on caption input
    useEffect(() => {
        captionRef.current.focus()
    }, [])

    // Clean up 
    useEffect(() => {
        return () => { }
    }, [])


    // For creating a story
    async function addToStory() {

        dispatch(startLoading())
        // Validation
        if (postImageURL === null || postImageURL === undefined) {

            // Post object for download URL with image
            const story = {
                storyImageURL: null,
                caption,
                viewCount: 0,
                storyTimestamp: serverTimestamp()
            }
            sendStoryToFirebase(story)
        }
        else {
            const storage = getStorage();
            const storageRef = ref(storage, `stories/${new Date().getTime()}`);

            const uploadTask = uploadBytesResumable(storageRef, postActualImageURL);

            uploadTask.on('state_changed',
                async (snapshot) => {

                    switch (snapshot.state) {
                        case 'paused':
                            break;
                        case 'running':
                            break;


                    }
                },
                (error) => {
                    console.log('Sorry the uploadTask failed');
                },
                async () => {

                    await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {


                        // Post object for download URL with image
                        const story = {
                            storyImageURL: downloadURL,
                            caption,
                            viewCount: 0,
                            storyTimestamp: serverTimestamp()
                        }

                        sendStoryToFirebase(story)
                    });
                }
            );

        }


        // Add data to firebase storage
        async function sendStoryToFirebase(story) {
            const userRef = doc(db, "users", user.userId);

            // Set the "capital" field of the city 'DC'
            await updateDoc(userRef, {
                story: true,
                storyData: { story }
            });

            // Extra
            setPostImageURL('');
            setCaption('');
            dispatch(stopLoading())
        }

        // Close the modal after post button clicked
        closeStoryModal();

    }


    function getPostImage() {
        document.getElementById('choosePostImage').click();
    }

    function setPostImage(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (event) {
            // The file's text will be printed here
            setPostActualImageURL(e.target.files[0]);
            setPostImageURL(event.target.result);
        };

        reader.readAsDataURL(file);
    }


    return (

        <>

            <div className="create__post__modal__div" >


                <Card className="modal__body__content" >
                    <div>
                        <p style={{ marginRight: '157px' }}><b>Create Story</b></p>
                        <IconButton onClick={closeStoryModal} ><CancelIcon /></IconButton>
                    </div>
                    <hr />
                    <div className="create__post__modal__div__profile">
                        <Avatar src={user.userData.photoURL} />
                        <span>{user.userData.name}</span>
                    </div>
                    <div className="create__post__modal__div__input">
                        <textarea placeholder="What's on your mind, Sajed?" ref={captionRef} value={caption} onChange={(e) => { setCaption(e.target.value) }} cols="30" rows="2"></textarea>
                        <div className="bottom__input__modal">

                            <IconButton><img src={'/assets/MiddleSectionAssets/colorpallete.png'} alt="" /></IconButton>
                            <IconButton><img src={'/assets/MiddleSectionAssets/feeling.svg'} alt="" /></IconButton>
                        </div>
                    </div>



                    {postImageURL === null || postImageURL === undefined ? null :
                        <div id='style-2' className="post__image__container__link" style={{ width: '100%', height: '100px', overflowY: 'scroll', overflowX: 'hidden', position: 'relative' }}>
                            <Tooltip title="Remove Image"><IconButton onClick={() => setPostImageURL(null)} style={{ position: 'fixed', marginLeft: '28rem', }}><CancelRoundedIcon /></IconButton></Tooltip>
                            <img src={postImageURL} alt="post" style={{ width: '96%', borderRadius: '15px', margin: '0 7px' }} />
                        </div>

                    }

                    <div className="add__to__post">
                        <div>
                            <p><b>Add to your story</b></p>
                            <div className="add__to__post__icons">
                                <IconButton onClick={getPostImage}><CollectionsRoundedIcon color='primary' /></IconButton>

                                <input type="file" id='choosePostImage' accept="image/png, image/jpg, image/jpeg" onChange={setPostImage} hidden />

                            </div>
                        </div>

                    </div>
                    <div className="button__div__modal">
                        <Button variant="contained" color="primary" onClick={addToStory} fullWidth className='post__modal__button' >
                            Add to Story
                        </Button>
                    </div>



                </Card>


            </div>

        </>
    )

}

export default AddStory;