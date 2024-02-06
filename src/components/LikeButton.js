import React, {useEffect, useState} from "react";
import { deleteLikeFromPost, getPost, setLikeToPost} from "../Requests";

export default function LikeButton({postId}) {

    let userToken = localStorage.getItem('userToken') || '';
    const [likeCount, setLikeCount] = useState(null);
    const [hasLike, setHasLike] = useState(false);
    const [update, setUpdate] = useState(false)


    useEffect(() => {
        async function fetchLikes() {
            try {
                const result = await getPost(postId, userToken);
                setLikeCount(result.likes);
                setHasLike(result.hasLike)
            } catch (error) {
                console.log("Error:", error.message);
                if (error.message === '401')
                {
                    //window.location.href = '/login';
                }
            }
        }

        fetchLikes();
    }, [update]);

    function setLike()
    {
        setLikeToPost(postId, userToken)
            .then((result) =>{
                setUpdate(!update);
            })
            .catch((error) => {
                if (error.message === '401')
                {
                    window.location.href = '/login';
                }
            });
    }

    function deleteLike()
    {
        deleteLikeFromPost(postId, userToken)
            .then((result) =>{
                setUpdate(!update);
            })
            .catch((error) => {
                if (error.message === '401')
                {
                    window.location.href = '/login';
                }
            });
    }


    function toggleLike(){
        if (!hasLike)
        {
            setLike();
        }
        else
        {
            deleteLike();
        }
    }

    return (
        <div style={{ cursor: 'pointer' }} onClick={toggleLike}>
            <span>{likeCount}</span>
            {hasLike ? (
                <i className="bi-heart-fill mx-1" style={{ color: 'red' }}></i>
            ) : (
                <i className="bi-heart mx-1"></i>
            )}
        </div>
    )
}
