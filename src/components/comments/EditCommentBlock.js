import React, {useState} from "react";
import {editComment} from "../../Requests";

export default function EditCommentBlock({commentId, prevContent, onComponentUpdate}) {

    const [content, setContent] = useState(prevContent);
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
        editComment(userToken, commentId,
            {
                content: content,
            }).then((result) => {
            onComponentUpdate();
        })
            .catch((error) => {
                if (error.message === '401') {
                    window.location.href = '/login';
                }
            });
    }


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
                    <button className='btn btn-warning' disabled={content === '' || contentError} onClick={onClickSend}>Изменить
                    </button>
                </div>
            </div>
            {contentError && (
                <p style={{color: 'red'}}>Комментарий слишком длинный</p>
            )}
        </div>
    )
}
