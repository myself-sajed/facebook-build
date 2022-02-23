import { Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Tooltip, Typography, } from '@mui/material'
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';
import './PostCard.css'
import Comment from '../../Comment/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useSelector } from 'react-redux';

const PostCard = ({ post, postId }) => {

    const user = useSelector((state) => state.user.user)

    async function deletePost() {
        await deleteDoc(doc(db, "posts", postId));
    }

    async function likePost() {
        const postRef = doc(db, "posts", postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
            if (docSnap.data().likedBy.includes(user.userId)) {

                let myArray = post.likedBy;
                let myIndex = myArray.indexOf(user.userId);
                if (myIndex !== -1) {
                    myArray.splice(myIndex, 1);
                    await updateDoc(postRef, {
                        likedBy: myArray
                    });
                }
            } else {
                await updateDoc(postRef, {
                    likedBy: [...docSnap.data().likedBy, user.userId]
                });
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    return (
        <>
            <Card className="middle__post__card" style={{ borderRadius: '10px', width: '32.4vw', marginTop: '10px', marginBottom: '10px', }}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" src={post.userPhoto}>

                        </Avatar>
                    }
                    action={
                        <Tooltip title="Delete Post" placement='top'>
                            <IconButton onClick={deletePost}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    }
                    title={post.username}
                    subheader={new Date(post.timestamp?.seconds * 1000).toLocaleTimeString()}
                />

                <CardContent>
                    <Typography variant="body2" fontSize="15px" color="text.secondary">
                        {post.postImageURL ? post.caption :

                            <b style={{ fontSize: '25px', fontFamily: "Segoe UI Historic, Segoe UI , Helvetica, Arial, sans-serif", textAlign: 'center', color: '#1976d2' }}>{post.caption}</b>

                        }
                    </Typography>
                </CardContent>
                {
                    post.postImageURL ? <CardMedia
                        src={post.postImageURL}
                        component="img"
                        width="100%"

                    /> : null}
                <div className='like__count__post' style={{ marginTop: '10px', }}>
                    <div className="main__icon__div">
                        <img src={'/assets/MiddleSectionAssets/like.svg'} alt="" />
                        <img src={'/assets/MiddleSectionAssets/love.svg'} alt="" />
                        {post.likedBy.length}
                    </div>





                </div>
                <div className="like__comment__share">
                    <div className="single__icon" onClick={likePost}>

                        {post.likedBy.includes(user.userId) ? <IconButton><ThumbUpOffAltRoundedIcon color='primary' /></IconButton> : <IconButton ><ThumbUpOffAltRoundedIcon /></IconButton>}

                        Like
                    </div>
                    <div className="single__icon">
                        <IconButton><ModeCommentRoundedIcon /></IconButton>
                        Comment
                    </div>
                    <div className="single__icon">
                        <IconButton><ReplyAllRoundedIcon /></IconButton>
                        Share
                    </div>
                </div>

                <Comment postId={postId} post={post} />

            </Card>
        </>
    )
}

export default PostCard