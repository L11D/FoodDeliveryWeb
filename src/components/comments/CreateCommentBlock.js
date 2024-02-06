import React, {useState} from "react";
import {createComment} from "../../Requests";

export default function CreateCommentBlock({postId, parentCommentId, onComponentUpdate}) {

    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState(false);
    let userToken = localStorage.getItem('userToken') || '';

    function onChangeContent(e) {
        if (e.target.value.length <= 1000)
        {
            setContent(e.target.value);
            setContentError(false);
        }
        else
        {
            setContent(e.target.value);
            setContentError(true);
        }
    }

    function onClickSend() {
        createComment(userToken, postId,
            {
                content: content,
                parentId: parentCommentId ? parentCommentId : null
            }).then((result) =>{
                onComponentUpdate();
            })
            .catch((error) => {
                if (error.message === '401')
                {
                    window.location.href = '/login';
                }
            });
        setContent('');
    }

    if (parentCommentId == null) {
        return (
            <div className='container mb-3'>
                <div className='card'>
                    <div className='m-3'>
                        <p className="mb-3">Оставьте комментарий</p>
                        <div className='mb-3'>
                            <textarea className="form-control" onChange={onChangeContent} rows="3"
                                      value={content}></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className='btn btn-primary' disabled={content === ''|| contentError}
                                    onClick={onClickSend}>Отправить
                            </button>
                        </div>
                        {contentError && (
                            <p style={{color: 'red'}}>Комментарий слишком длинный</p>
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='row'>
                <div className='col-lg-10'>
                        <textarea
                            className="form-control"
                            onChange={onChangeContent} rows="1"
                            value={content}
                            placeholder='Оставьте комментарий...'
                        />
                </div>
                <div className='col-lg '>
                    <div className="d-flex justify-content-lg-end mt-lg-0 mt-2">
                        <button className='btn btn-primary' disabled={content === '' || contentError} onClick={onClickSend}>Отправить
                        </button>
                    </div>
                </div>
                {contentError && (
                    <p style={{color: 'red'}}>Комментарий слишком длинный</p>
                )}
            </div>
        )
    }
}