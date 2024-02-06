import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import MainPage from "./MainPageFolder/MainPage";
import {getCommunity, getProfile, getRoleInCommunity} from "../Requests";
import {Image} from "react-bootstrap";
import maleImg from '../media/male.png';
import femaleImg from '../media/female.png';
import SubscribeButton from "../components/SubscribeButton";

export default function CommunityPage() {

    const { id } = useParams();
    const [data, setData] = useState('');

    let userToken = localStorage.getItem('userToken') || '';
    const [role, setRole] = useState('')
    const [updateRole, setUpdateRole] = useState(false)


    useEffect(() => {

        getCommunity(id)
            .then((result) => {
                setData(result);
            })
            .catch((error) => {
                console.log( error.message);
            });

    }, []);

    useEffect(() => {
        getRoleInCommunity(userToken, id)
            .then((result) => {
                if (result != null)
                    setRole(result);
                else
                    setRole('');
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === '401') {
                    window.location.href = '/login';
                }
            });

    }, [updateRole]);

    function update()
    {
        setUpdateRole(!updateRole);
    }


    function createPost()
    {
        getProfile(userToken)
            .then((result) => {
                window.location.href = `/post/create?communityId=${id}`;
            })
            .catch((error) => {
                window.location.href = '/login';
            });
    }

    return (
        <div className='mt-3'>
            <div className='container'>
                <div className='card mb-3'>
                    <div className='m-3'>
                        <div className='row mb-2'>
                            <div className='col'>
                                <h3>Группа "{data.name}"</h3>
                            </div>
                            <div className='col-lg'>
                                <div className='row d-flex justify-content-lg-end mt-2 mt-lg-0'>
                                    {role === 'Administrator' && (
                                        <div className='col-auto'>
                                            <button className='btn btn-primary' onClick={createPost}>Написать пост</button>
                                        </div>
                                    )}
                                    <div className='col-auto'>
                                        <SubscribeButton communityId={id} onUpdate={update}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mb-2'>
                            <i className="bi bi-people-fill"></i>
                            {` Число подписчиков: ${data.subscribersCount}`}
                        </div>

                        <div className='mb-2'>
                            {`Тип сообщества: ${data.isClosed ? 'закрытое' : 'открытое'}`}
                        </div>

                        <div className='mb-2'>
                            <h5>Администраторы</h5>
                            <div className='list-group'>
                                {data.administrators != null && data.administrators.map((item,index)=>(
                                    <div className='list-group-item' key={index}>
                                        <div className='my-2'>
                                            <div className='row'>
                                                <div className='col-auto'>
                                                    <img src={ item.gender === 'Male' ? maleImg : femaleImg} style={{ width: "80px", height: "80px" }}/>
                                                </div>
                                                <div className='col ms-1 pt-1'>
                                                    <span style={{ fontWeight: 'bold' }}>{item.fullName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {!(role === '' && data.isClosed === true) && (
                <MainPage communityId={id}/>
            )}
        </div>
    )
}
