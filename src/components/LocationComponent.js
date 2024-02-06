import React, {useEffect, useState} from "react";
import {getAddressChain} from "../Requests";

let messageNotState = ' '
export default function LocationComponent({guid}) {

    const [message, setMessage] = useState('')

    useEffect(() => {

        getAddressChain(guid)
            .then((result) =>{
                console.log(result)
                messageNotState = ' '
                for (let i = 0; i < result.length; i++) {
                    if (i < result.length - 1)
                        messageNotState += result[i].text + ', ';
                    else
                        messageNotState += result[i].text;
                }
                setMessage(messageNotState);
            })
            .catch((error) => {
                console.log(error.message)
            });

    }, []);

    if (guid != null)
    {
        return (
            <div className='mb-3' >
                <i className="bi-geo-alt-fill"></i>
                {message}
            </div>
        )
    }
    else
    {
        return (
            <div  >
               
            </div>
        )
    }


}
