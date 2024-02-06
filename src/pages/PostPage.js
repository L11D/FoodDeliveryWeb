import React, {useEffect, useRef, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import {getPost} from "../Requests";
import PostItem from "../components/PostItem";
import CommentsBlock from "../components/comments/CommentsBlock";
import CreateCommentBlock from "../components/comments/CreateCommentBlock";

export default function PostPage() {

    let userToken = localStorage.getItem('userToken') || '';



    const [postData, setPostData] = useState(null);
    const { id } = useParams();
    const location = useLocation();

    const [update, setUpdate] = useState(false)
    const commentsBlockRef = useRef(null);

    const handleUpdate = () =>
    {
        setUpdate(!update);
    }

    useEffect(() => {
        async function fetchPost() {
            try {
                const result = await getPost(id, userToken);
                console.log(result);
                setPostData(result);
            } catch (error) {
                console.error("Error:", error.message);
            }
        }

        fetchPost();
    }, [update]);

    useEffect(() => {
        if (location.search.includes("scrollToComments") && commentsBlockRef.current) {
            commentsBlockRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [commentsBlockRef.current]);


    if (!postData) {
        return <div className='container'><h3>Loading ...</h3></div>;
    }

    return (
        <div>
            <div className='mt-3'>
                <PostItem
                    title = {postData.title}
                    description = {postData.description}
                    author = {postData.author}
                    createTime = {postData.createTime}
                    communityName = {postData.communityName}
                    readingTime = {postData.readingTime}
                    image = {postData.image}
                    likes = {postData.likes}
                    commentsCount = {postData.commentsCount}
                    tags = {postData.tags}
                    id = {postData.id}
                    guid = {postData.addressId}
                    isActive = {false}
                />
            </div>
            <div ref={commentsBlockRef}>
                <CommentsBlock onComponentUpdate={handleUpdate} postId={postData.id} comments={postData.comments} />
            </div>
            <CreateCommentBlock onComponentUpdate={handleUpdate} postId={postData.id}/>
        </div>
    )
}

