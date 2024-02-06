import React, {useEffect, useState} from "react";
import {getCommunities} from "../Requests";
import CommunityComponent from "../components/CommunityComponent";

export default function CommunitiesPage() {

    const [communities, setCommunities] = useState([])


    useEffect(() => {

        getCommunities()
            .then((result) =>{
                let coms = result.map((item) =>(
                    {
                        name: item.name,
                        id: item.id
                    }
                ))
                setCommunities(coms);
            })
            .catch((error) => {
                console.log(error.message);
            });

    }, []);

    return (
        <div className='container mt-3'>
            {communities.map((item, index) =>(
                <CommunityComponent communityId={item.id} communityName={item.name} key={index}/>
            ))}
        </div>
    )
}
