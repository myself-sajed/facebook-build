import { Avatar, Badge, IconButton } from '@mui/material'
import { doc, getDoc, updateDoc, } from 'firebase/firestore'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../../firebase/firebase'
import './SingleComment.css'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ReplyComment from './ReplyComment'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';


export const SingleComment = ({ comment, postId, postComment, post }) => {

    const [replyComment, setReplyComment] = useState(`@${comment.commentUser.username} `)
    const [showReplyCommentBox, setShowReplyCommentBox] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const replyRef = useRef('')




    // To Delete the Comment
    async function deleteComment() {

        // deleting the comment
        const postRef = doc(db, "posts", postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {


            // Changed app
            var indexOfComment = -1;
            for (var i = 0; i < docSnap.data().commentBy.length; i++) {
                if (docSnap.data().commentBy[i].commentId === comment.commentId) {
                    indexOfComment = i;
                    const myArray = docSnap.data().commentBy
                    if (indexOfComment !== -1) {
                        myArray.splice(indexOfComment, 1);
                        await updateDoc(postRef, {
                            commentBy: myArray
                        });
                    }
                    break;
                }
            }



        } else {
            console.log("No such document!");
        }
    }

    // To reply the comment 
    async function postReplyComment() {
        // let usernameToBeAdded = null
        if (replyComment === '') {
            return
        }


        setReplyComment('')
        setShowReplyCommentBox(false)



        // adding reply comment
        const postRef = doc(db, "posts", postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
            const commentReplyId = `${Math.floor(Math.random() * 1e9)}-${new Date().getTime()}`
            const d = new Date().getTime()


            // Changed app
            // Changed app
            var indexOfComment = -1;
            for (var i = 0; i < docSnap.data().commentBy.length; i++) {
                if (docSnap.data().commentBy[i].commentId === comment.commentId) {
                    indexOfComment = i;
                    const newComment = docSnap.data().commentBy[i]
                    newComment.replyBy.push({ replyUser: user.userData, theReply: replyComment, time: d, replyId: commentReplyId })
                    const myArray = docSnap.data().commentBy
                    if (indexOfComment !== -1) {
                        myArray.splice(indexOfComment, 1);
                        myArray.push(newComment)
                        await updateDoc(postRef, {
                            commentBy: myArray.sort(function (x, y) {
                                return y.time - x.time;
                            })
                        });
                    }
                    setShowReplies(true)
                    break;
                }
            }
        } else {
            console.log("No such document!");
        }


    }

    const user = useSelector(state => state.user.user)
    return (
        <div className="comment__section__of__post__body">

            <Avatar src={comment.commentUser.photoURL} alt="" />
            <div className="comment__wrapper">
                <span><b>{comment.commentUser.name}</b></span>
                <p style={{ fontFamily: 'sans-serif' }}>{comment.theComment}</p>


                <div className="tools__comment">
                    <span onClick={() => {
                        setShowReplyCommentBox(!showReplyCommentBox);
                        setReplyComment(`@${comment.commentUser.username}`)
                    }}>Reply</span>
                    <span>Report</span>

                    {comment.commentUser.username === user.userData.username ? <span onClick={deleteComment}>Delete</span> : null}

                    {comment.replyBy.length > 0 ? showReplies ?
                        <Badge badgeContent={comment.replyBy.length} color="primary"><span onClick={() => setShowReplies(false)} ><ExpandMoreRoundedIcon /></span></Badge> :
                        <Badge badgeContent={comment.replyBy.length} color="primary"> <span onClick={() => setShowReplies(true)}><ExpandLessRoundedIcon /></span></Badge> : null}
                </div>
                {showReplyCommentBox ? <div className="reply__me" style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', }}>
                    <Avatar src={user.userData.photoURL} alt="" />
                    <div className="input__wrapper__comment" style={{ border: '1px solid #dbdbdb' }}>
                        <textarea type="text" cols="30" ref={replyRef} style={{ maxWidth: '280px', width: '280px', resize: 'none', marginBottom: '10px' }} value={replyComment} onChange={(e) => { setReplyComment(e.target.value) }} placeholder='reply to this comment' />


                        <div className="comment__icons__input">
                            <IconButton onClick={() => { postReplyComment(comment.commentUser.username) }}><SendRoundedIcon color='primary' /></IconButton>
                        </div>
                    </div>
                </div> : null}




                {showReplies && post.commentBy.map((item, index) => {

                    return item.commentId === comment.commentId &&
                        item.replyBy.map((reply, index) => { return <ReplyComment setShowReplies={setShowReplies} postReplyComment={postReplyComment} reply={reply} key={index} commentId={comment.commentId} postId={postId} setReplyComment={setReplyComment} replyComment={replyComment} comment={comment} /> })
                })}

            </div>



        </div>
    )
}
