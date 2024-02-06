import React, {useEffect, useRef, useState} from "react";
import GarItem from "./GarItem";

export default function GarBlock({onAddressIdChange}) {

    const [guid, setGuid] = useState('')
    const garItemRef=useRef(null);

    useEffect(() => {
        onAddressIdChange(guid);
    }, [guid]);

    function handleGUID(param)
    {
        //console.log(param);
        setGuid(param.guid)
    }

    function cancelAddress()
    {
        garItemRef.current.cancelAddress();
    }

    return (
        <div>
            <h5>Адрес</h5>
            <GarItem parentObjectId={0} onGUIDChange={handleGUID} ref={garItemRef}/>
            <button className='btn btn-danger' onClick={cancelAddress} >Сброс адреса</button>
        </div>
    )
}

