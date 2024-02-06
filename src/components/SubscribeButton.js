import React, {useEffect, useState} from "react";
import {getRoleInCommunity, subscribeToCommunity, unsubscribeToCommunity} from "../Requests";

export default function SubscribeButton({communityId, onUpdate}) {

    let userToken = localStorage.getItem('userToken') || '';

    const [update, setUpdate] = useState(false);
    const [role, setRole] = useState('')


    useEffect(() => {

        if (onUpdate)
            onUpdate()
        getRoleInCommunity(userToken, communityId)
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

    }, [update]);

    function subscribe() {
        subscribeToCommunity(userToken, communityId)
            .then((result) => {
                setUpdate(!update);
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === '401') {
                    window.location.href = '/login';
                }
            });
    }

    function unSubscribe() {
        unsubscribeToCommunity(userToken, communityId)
            .then((result) => {
                setUpdate(!update);
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === '401') {
                    window.location.href = '/login';
                }
            });
    }

    return (
        <div>
            {role === '' && (
                <div>
                    <button className='btn btn-primary' onClick={subscribe}>Подписаться</button>
                </div>
            )}
            {role === 'Subscriber' && (
                <div>
                    <button className='btn btn-danger' onClick={unSubscribe}>Отписаться</button>
                </div>
            )}
        </div>
    )
}
