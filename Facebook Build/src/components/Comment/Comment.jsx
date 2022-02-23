import './Comment.css'
import { Avatar, Badge, Divider, IconButton } from '@mui/material';
import { SingleComment } from './SingleComment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useSelector } from 'react-redux';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';


const Comment = ({ postId, post }) => {

    const [comment, setComment] = useState('')
    const user = useSelector(state => state.user.user)
    const [isCommentOpen, setIsCommentOpen] = useState(false)
    const [commentLoading, setCommentLoading] = useState(false)
    const [replyComment, setReplyComment] = useState('')

    useEffect(() => {
        return () => { }
    })

    // post comment function
    const postComment = async () => {
        if (comment === '') {
            return
        }
        else {
            setComment('')
            setCommentLoading(true)
            const postRef = doc(db, "posts", postId);
            const docSnap = await getDoc(postRef);

            if (docSnap.exists()) {
                const commentId = `${Math.floor(Math.random() * 1e9)}-${new Date().getTime()}`
                const d = new Date().getTime()
                await updateDoc(postRef, {
                    commentBy: [...docSnap.data().commentBy, { commentUser: user.userData, theComment: comment, time: d, commentId, replyBy: [] }].sort(function (x, y) {
                        return y.time - x.time;
                    })
                });

                setIsCommentOpen(true)
                setCommentLoading(false)
            } else {
                console.log("No such document!");
            }
        }
    }

    return (
        <div className="comment__section__of__post">
            <div className="comment__section__of__post__header">
                <Avatar src={user.userData.photoURL} alt="" />
                <div className="input__wrapper__comment">
                    <textarea type="text" cols="40" style={{ maxWidth: '300px', width: '300px', resize: 'none' }} value={comment} onChange={(e) => { setComment(e.target.value) }} placeholder={commentLoading ? 'Posting your comment...' : 'Add a comment...'} />


                    <div className="comment__icons__input">
                        <IconButton onClick={postComment}><SendRoundedIcon color='primary' /></IconButton>
                    </div>
                </div>

                {!isCommentOpen ?
                    <IconButton style={{ border: '1px solid #cfcdcd' }} onClick={() => { setIsCommentOpen(true) }}>
                        <Badge badgeContent={post.commentBy.length} color="primary">
                            <ExpandLessRoundedIcon />
                        </Badge>
                    </IconButton>
                    :
                    <IconButton style={{ border: '1px solid #cfcdcd' }} onClick={() => { setIsCommentOpen(false) }}>
                        <Badge badgeContent={post.commentBy.length} color="primary">
                            <ExpandMoreRoundedIcon />
                        </Badge>
                    </IconButton>}
            </div>
            <Divider />


            {isCommentOpen && post.commentBy.map((comment, index) => {
                return <SingleComment setIsCommentOpen={setIsCommentOpen} postComment={postComment} post={post} comment={comment} postId={postId} key={index} />
            })}


        </div>
    )
}

export default Comment  