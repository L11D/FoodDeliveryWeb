import React, {useEffect, useRef, useState} from "react";
import {deleteComment, getCommentTree, getProfile} from "../../Requests";
import CreateCommentBlock from "./CreateCommentBlock";
import EditCommentBlock from "./EditCommentBlock";
import WasEditedBlock from "./WasEditedBlock";



export default function CommentItem({commentData, postId, isSubComment, onComponentUpdate, onUpdateRoot}) {
    let userToken = localStorage.getItem('userToken') || '';
    const [userId, setUserId] = useState('');

    const [subCommentData, setSubCommentData] = useState([]);
    const [displaySubcomments, setDisplaySubcomments] = useState(false);
    const [reply, setReply] = useState(false);
    const [changingComment, setChangingComment] = useState(false);
    const [update, setUpdate] = useState(false)
    const tooltipRef = useRef(null);
    const handleUpdateFromSubComment = () => {
        setUpdate(!update);
        if (onUpdateRoot)
            onUpdateRoot()
    }

    const handleUpdateFromCreateComment = () => {
        toggleReply()
        setUpdate(!update);
        if (onUpdateRoot)
            onUpdateRoot()
        if (onComponentUpdate)
            onComponentUpdate()
    }

    const handleUpdateFromEditComment = () => {
        setUpdate(!update);
        toggleChangingComment();
        if (onUpdateRoot)
            onUpdateRoot()
        if (onComponentUpdate)
            onComponentUpdate()
    }

    useEffect(() => {
        getProfile(userToken)
            .then((result) => {
                setUserId(result.id);
            })
            .catch((error) => {

            })
    }, [userId]);

    useEffect(() => {

        async function fetchSubComments() {
            try {
                const result = await getCommentTree(commentData.id);
                setSubCommentData(result);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }

        if (isSubComment === false)
            fetchSubComments();

    }, [update]);

    function formatCreateTime(dateTimeString) {
        const options = {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        const formattedDate = new Date(dateTimeString).toLocaleString(undefined, options);
        return formattedDate.replace(',', '');
    }

    function toggleReply() {
        setDisplaySubcomments(true)
        setReply(!reply);
    }

    function toggleDisplaySubcomments() {
        setDisplaySubcomments(!displaySubcomments)
    }

    function toggleChangingComment() {
        setChangingComment(!changingComment);
    }

    function onDeleteComment() {
        deleteComment(userToken, commentData.id)
            .then((result) => {
                if (onUpdateRoot)
                    onUpdateRoot()
                if (onComponentUpdate)
                    onComponentUpdate()
            })
            .catch((error) => {
                if (error.message === '401') {
                    window.location.href = '/login';
                }
            });
    }

    if (commentData.deleteDate == null) {
        return (
            <div className='mb-3'>
                <label style={{fontSize: '13px'}}>{commentData.author}</label>
                {commentData.authorId === userId && (
                    <span>
                <i className="bi-pencil-fill mx-1" onClick={toggleChangingComment}
                   style={{color: 'orange', cursor: 'pointer'}}></i>
                     <i className="bi-trash-fill mx-1" onClick={onDeleteComment}
                        style={{color: 'red', cursor: 'pointer'}}></i>
                </span>
                )}
                {changingComment ? (
                    <EditCommentBlock onComponentUpdate={handleUpdateFromEditComment} commentId={commentData.id}
                                      prevContent={commentData.content}/>

                ) : (
                    <div>
                        {commentData.content}
                        {commentData.modifiedDate != null &&(
                            <WasEditedBlock editTime={formatCreateTime(commentData.modifiedDate)}/>
                        )}
                    </div>
                )}

                <div>
                    <label style={{fontSize: '13px'}}>{formatCreateTime(commentData.createTime)}</label>
                    <span onClick={toggleReply}
                          style={{
                              fontSize: '13px',
                              color: 'blue',
                              cursor: 'pointer',
                              userSelect: 'none'
                          }}> Ответить</span>
                </div>

                {reply && (
                    <CreateCommentBlock onComponentUpdate={handleUpdateFromCreateComment} postId={postId}
                                        parentCommentId={commentData.id}/>
                )}

                {commentData.subComments !== 0 && isSubComment === false && (
                    <div>
                        {displaySubcomments && (
                            <div className='mt-2'>
                                {subCommentData.map((value, index) => (
                                    <div className='ms-3' key={index}>
                                        <CommentItem postId={postId} isSubComment={true}
                                                     onComponentUpdate={handleUpdateFromSubComment} commentData={value}
                                                     key={index}/>
                                    </div>
                                ))}
                            </div>
                        )}
                        <span onClick={toggleDisplaySubcomments}
                              style={{
                                  fontSize: '13px',
                                  color: 'blue',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                              }}>{displaySubcomments ? 'Скрыть ответы' : 'Раскрыть ответы'}</span>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className='mb-3'>
                <label style={{fontSize: '13px'}}>[Комментарий удален]</label>

                <div>[Комментарий удален]</div>

                <div>
                    <label style={{fontSize: '13px'}}>{formatCreateTime(commentData.deleteDate)}</label>
                </div>

                {commentData.subComments !== 0 && isSubComment === false && (
                    <div>
                        {displaySubcomments && (
                            <div className='mt-2'>
                                {subCommentData.map((value, index) => (
                                    <div className='ms-3' key={index}>
                                        <CommentItem postId={postId} isSubComment={true}
                                                     onComponentUpdate={handleUpdateFromSubComment} commentData={value}
                                                     key={index}/>
                                    </div>
                                ))}
                            </div>
                        )}
                        <span onClick={toggleDisplaySubcomments}
                              style={{
                                  fontSize: '13px',
                                  color: 'blue',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                              }}>{displaySubcomments ? 'Скрыть ответы' : 'Раскрыть ответы'}</span>
                    </div>
                )}
            </div>
        )
    }
}