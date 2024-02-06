import React from "react";
import CommentItem from "./CommentItem";

export default function CommentsBlock({onComponentUpdate, comments, postId}) {

    if (comments.length > 0)
    {
        return (
            <div className='container mb-3' >
                <div className='card'>
                    <div className='m-3'>
                        <h3 className="mb-3">Комментарии</h3>

                        {comments.map((value, index) => (
                            <CommentItem onUpdateRoot={onComponentUpdate} isSubComment={false} postId={postId} commentData={value} key={index}/>
                        ))}

                    </div>
                </div>
            </div>
        )
    }
    else
    {
        return (
            <div className='container mb-3'>
                <div className='card'>
                    <div className='m-3'>
                        <h3 className="mb-3">Комментарии</h3>
                        <p>Комментариев пока нет</p>
                    </div>
                </div>
            </div>
        )
    }
}

