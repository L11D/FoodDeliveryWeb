import React, {useEffect, useState} from "react";
import TagChooseComponent from "../components/PostCreation/TagChooseComponent";
import CommunitiesChooseComponent from "../components/PostCreation/CommunitiesChooseComponent";
import {createPersonalPost, createPostInCommunity} from "../Requests";
import GarBlock from "../components/PostCreation/GarBlock";

export default function PostCreationPage() {

    let userToken = localStorage.getItem('userToken') || '';

    let urlParams = new URLSearchParams(window.location.search);
    let communityIdFromUrl = urlParams.get('communityId');

    const [tags, setTags] = useState([])
    const [tagsError, setTagsError] = useState(true)
    const [community, setCommunity] = useState('')

    const [title, setTitle] = useState('')
    const [titleTouched, setTitleTouched] = useState(false)
    const [titleError, setTitleError] = useState(true)

    const [readingTime, setReadingTime] = useState(0)
    const [image, setImage] = useState('')
    const [imageError, setImageError] = useState(false)

    const [description, setDescription] = useState('')
    const [descriptionTouched, setDescriptionTouched] = useState(false)
    const [descriptionError, setDescriptionError] = useState(true)

    const [addressId, setAddressId] = useState('')

    useEffect(() => {
        console.log(addressId);
    }, [addressId]);

    useEffect(() => {
        if (tags.length > 0)
            setTagsError(false)
        else
            setTagsError(true);
    }, [tags]);

    function handleTagsChange(tag) {
        setTags([...tag])
    }

    function handleParamsBlur(e) {
        if (e.target.id === 'TitleControl') {
            setTitle(e.target.value);
            setTitleTouched(true);
            if (e.target.value.length < 5 || e.target.value.length > 1000)
                setTitleError(true)
            else
                setTitleError(false)
        }
        if (e.target.id === 'ReadTimeControl') {
            if (e.target.value >= 0 && e.target.value !== '')
                setReadingTime(e.target.value);
            else
                setReadingTime(0);
        }
        if (e.target.id === 'ImageControl') {
            setImage(e.target.value);
            if (e.target.value.length > 1000)
                setImageError(true)
            else
                setImageError(false)
        }
        if (e.target.id === 'DescriptionControl') {
            setDescription(e.target.value);
            setDescriptionTouched(true);
            if (e.target.value.length < 5 || e.target.value.length > 5000)
                setDescriptionError(true)
            else
                setDescriptionError(false)
        }
    }

    function handleParamsChange(e) {
        if (e.target.id === 'TitleControl') {
            setTitle(e.target.value);
        }
        if (e.target.id === 'ReadTimeControl') {
            setReadingTime(e.target.value);
        }
        if (e.target.id === 'ImageControl') {
            setImage(e.target.value);
        }
        if (e.target.id === 'DescriptionControl') {
            setDescription(e.target.value);
        }
    }

    function create(){
        if (community === '')
        {
            createPersonalPost(userToken,{
                title: title,
                description: description,
                readingTime: readingTime,
                image: image === '' ? null : image,
                addressId: addressId=== '' ? null : addressId,
                tags: tags
            })
                .then((result) => {
                    window.location.href = `/post/${result}`;
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    if (error.message === '401') {
                        window.location.href = '/login';
                    }
                });
        }
        else
        {
            createPostInCommunity(userToken, community,{
                title: title,
                description: description,
                readingTime: readingTime,
                image: image === '' ? null : image,
                addressId: addressId=== '' ? null : addressId,
                tags: tags
            })
                .then((result) => {
                    window.location.href = `/post/${result}`;
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    if (error.message === '401') {
                        window.location.href = '/login';
                    }
                });
        }
    }

    return (
        <div className='container d-flex flex-wrap justify-content-center my-auto'>
            <div className="card col-lg-11 col-12">
                <div className="m-3">
                    <h3 className="mb-3">Написать новый пост</h3>
                    <div className='row mb-3'>
                        <div className="col-lg-9">
                            <label htmlFor="TitleControl" className="form-label">Название</label>
                            <input type="text" className="form-control" value={title} onBlur={handleParamsBlur}
                                   onChange={handleParamsChange} id="TitleControl"/>
                            {(titleError && titleTouched) && (
                                <p style={{color: 'red'}}>Название должно содержать от 5 до 1000 символов</p>
                            )}
                        </div>
                        <div className="col-lg">
                            <label htmlFor="ReadTimeControl" className="form-label">Время чтения</label>
                            <input type="number" className="form-control" min={0} value={readingTime}
                                   onBlur={handleParamsBlur} onChange={handleParamsChange} id="ReadTimeControl"/>
                        </div>
                    </div>

                    <div className='row'>

                        <div className="col-lg">
                            <label htmlFor="SortSelectControl" className="form-label">Группа</label>
                            <CommunitiesChooseComponent onCommunityChange={setCommunity} communityId={communityIdFromUrl}/>
                        </div>

                        <div className="col-lg">
                            <label htmlFor="TagControl" className="form-label">Тэги</label>
                            <TagChooseComponent onTagsChange={handleTagsChange}/>
                            {(tagsError) && (
                                <p style={{color: 'red'}}>Укажите хотя бы один тэг</p>
                            )}
                        </div>

                    </div>

                    <div className="mb-4">
                        <label htmlFor="ImageControl" className="form-label">Ссылка на картинку</label>
                        <input type="text" className="form-control" value={image} onBlur={handleParamsBlur}
                               onChange={handleParamsChange} id="ImageControl"/>
                        {(imageError) && (
                            <p style={{color: 'red'}}>Ссылка на картинку должна содержать не более 1000 символов</p>
                        )}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="DescriptionControl" className="form-label">Текст</label>
                        <textarea className="form-control" id='DescriptionControl' value={description}
                                  onBlur={handleParamsBlur} onChange={handleParamsChange} rows="7"></textarea>
                        {(descriptionError && descriptionTouched) && (
                            <p style={{color: 'red'}}>Текст должен содержать от 5 до 5000 символов</p>
                        )}
                    </div>

                    <GarBlock onAddressIdChange={setAddressId}/>

                    {(tagsError || titleError || imageError || descriptionError) ? (
                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-primary col-12 col-lg-2" disabled={true}>Создать пост</button>
                        </div>
                    ) : (
                        <div className='d-flex justify-content-end'>
                            <button className="btn btn-primary col-12 col-lg-2" onClick={create}>Создать пост</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

