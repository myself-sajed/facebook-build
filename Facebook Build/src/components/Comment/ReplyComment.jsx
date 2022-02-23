import { Avatar, IconButton } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../firebase/firebase';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


const ReplyComment = ({ reply, commentId, postId, setShowReplies, postReplyComment, comment }) => {

    const user = useSelector(state => state.user.user)
    const [replyInsideComment, setReplyInsideComment] = useState(`@${reply.replyUser.username}`)
    const [showReplyCommentBoxInReplySection, setShowReplyCommentBoxInReplySection] = useState(false)


    // Delete reply 
    async function deleteReplyComment() {

        // deleting the comment
        const postRef = doc(db, "posts", postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {


            // Changed app
            let indexOfComment = -1;
            for (let i = 0; i < docSnap.data().commentBy.length; i++) {
                if (docSnap.data().commentBy[i].commentId === commentId) {
                    indexOfComment = i;
                    let indexOfReply = -1;
                    const desiredComment = docSnap.data().commentBy[indexOfComment]
                    const replyArray = desiredComment.replyBy
                    desiredComment.replyBy.forEach(async function (item, index) {
                        if (item.replyId === reply.replyId) {
                            indexOfReply = index;
                            replyArray.splice(indexOfReply, 1);
                            desiredComment.replyBy = replyArray
                            const wholeCommentArray = docSnap.data().commentBy


                            if (indexOfComment !== -1) {
                                wholeCommentArray.splice(indexOfComment, 1);
                                wholeCommentArray.push(desiredComment)
                                await updateDoc(postRef, {
                                    commentBy: wholeCommentArray.sort(function (x, y) {
                                        return y.time - x.time;
                                    })
                                });
                            }

                        }
                    })


                }
                setShowReplies(true)
            }



        } else {
            console.log("No such document!");
        }
    }

    // give reply of reply
    async function postReplyInsideComment() {
        // let usernameToBeAdded = null
        if (replyInsideComment === '') {
            return
        }


        setReplyInsideComment('')
        setShowReplyCommentBoxInReplySection(false)



        // adding reply comment
        const postRef = doc(db, "posts", postId);
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
            const commentReplyId = `${Math.floor(Math.random() * 1e9)}-${new Date().getTime()}`
            const d = new Date().getTime()



            var indexOfComment = -1;
            for (var i = 0; i < docSnap.data().commentBy.length; i++) {
                if (docSnap.data().commentBy[i].commentId === comment.commentId) {
                    indexOfComment = i;
                    const newComment = docSnap.data().commentBy[i]
                    newComment.replyBy.push({ replyUser: user.userData, theReply: replyInsideComment, time: d, replyId: commentReplyId })
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
                    setShowReplyCommentBoxInReplySection(false)
                    break;
                }
            }
        } else {
            console.log("No such document!");
        }


    }


    return (
        <div className="replies_container" style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #d1d1d1', padding: '5px', margin: '10px 0 10px 0', backgroundColor: '#dfe3e887', borderRadius: '20px' }}>


            <div className="container__reply__div" style={{ width: '100%', }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '10px', gap: '10px' }}>

                    <Avatar style={{ cursor: 'pointer' }} src={reply.replyUser.photoURL}></Avatar>
                    <p style={{ margin: 0, fontFamily: 'sans-serif', maxWidth: '17rem', wordBreak: 'break-word', }}>{reply.theReply}</p>

                </div>
                <div className="reply__comment__tools" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                    <p style={{
                        cursor: 'pointer',
                        color: 'rgb(57, 137, 241)',
                        fontSize: '13px'
                    }} onClick={() => {
                        setShowReplyCommentBoxInReplySection(!showReplyCommentBoxInReplySection);
                        setReplyInsideComment(`@${reply.replyUser.username}`)
                    }}
                    >Reply</p>

                    {reply.replyUser.username === user.userData.username ? <p style={{
                        cursor: 'pointer',
                        color: 'rgb(57, 137, 241)',
                        fontSize: '13px'
                    }} onClick={deleteReplyComment}
                    >Delete</p> : null}</div>

                {showReplyCommentBoxInReplySection ? <div className="reply__me" style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', }}>
                    <Avatar src={user.userData.photoURL} alt="" />
                    <div className="input__wrapper__comment" style={{ border: '1px solid #cbc7c7' }}>
                        <textarea type="text" cols="30" style={{ maxWidth: '266px', width: '266px', resize: 'none', marginBottom: '10px' }} value={replyInsideComment} onChange={(e) => { setReplyInsideComment(e.target.value) }} placeholder='reply to this comment' />

                        <div className="comment__icons__input">
                            <IconButton onClick={() => {

                                postReplyInsideComment()
                            }}><SendRoundedIcon color='primary' /></IconButton>
                        </div>
                    </div>
                </div> : null}
            </div>

        </div>
    )
}

export default ReplyComment