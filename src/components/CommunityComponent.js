import React, {useEffect, useState} from "react";
import {getRoleInCommunity, subscribeToCommunity, unsubscribeToCommunity} from "../Requests";
import SubscribeButton from "./SubscribeButton";

export default function CommunityComponent({communityName, communityId}) {

    function goToCommunity()
    {
        window.location.href = `/communities/${communityId}`;
    }

    return (
        <div className='card mb-2'>
            <div className='m-3 d-flex justify-content-between row'>
                <div className='col'>
                    <h3 onClick={goToCommunity} style={{ cursor: 'pointer' }} > {communityName}</h3>
                </div>

                <div className='col-lg d-flex justify-content-lg-end mt-2 mt-lg-0'>
                    <SubscribeButton communityId={communityId}/>
                </div>
            </div>
        </div>
    )
}
