import React, {useEffect, useState} from "react";
import {getCommunityById, getMyCommunities, getPost} from "../../Requests";
import {value} from "lodash/seq";

export default function CommunitiesChooseComponent({onCommunityChange, communityId}) {

    let userToken = localStorage.getItem('userToken') || '';
    const [communitiesId, setCommunitiesId] = useState([])
    const [communities, setCommunities] = useState([])
    const [optionValue, setOptionValue] = useState('')


    useEffect(() => {
        function fetchCommunities() {
            getMyCommunities(userToken)
                .then((result) => {
                    const adminCommunities = result
                        .filter((item) => item.role === 'Administrator')
                        .map((item) => item.communityId);
                    setCommunitiesId(adminCommunities);
                })
                .catch((error) => {
                    console.log(error.message);
                    if (error.message === '401') {
                        window.location.href = '/login';
                    }
                });
        }

        fetchCommunities();

    }, []);

    useEffect(() => {
        async function fetchCommunitiesNames()
        {
            let names = [];
            for (let i = 0; i < communitiesId.length; i++) {
                try {
                    const result = await getCommunityById(communitiesId[i]);
                    names.push(result.name)
                } catch (error) {
                    console.error("Error:", error.message);
                }
            }
            let coms = [];
            for (let i = 0; i < names.length; i++) {
                coms.push({
                    name: names[i],
                    id: communitiesId[i]
                })
            }
            setCommunities(coms);
        }
        fetchCommunitiesNames();

    }, [communitiesId]);

    useEffect(() => {
        let founded = false;
        for (let i = 0; i < communities.length; i++) {
            if (communities[i].id === communityId)
                founded = true;
        }
        if (founded)
        {
            setOptionValue(communityId);
        }
        else
        {
            setOptionValue('');
        }
    }, [communities]);

    useEffect(() => {
        onCommunityChange(optionValue)
    }, [optionValue]);

    function handleCommunitiesChange(e)
    {
        setOptionValue(e.target.value);
    }


    return (
        <select className="form-select" onChange={handleCommunitiesChange} id="SelectControl" value={optionValue}>
            <option value="">Без группы</option>
            {communities.map((value, index) => (
                <option value={value.id}  key={index}>{value.name}</option>
            ))}
        </select>
    )
}

