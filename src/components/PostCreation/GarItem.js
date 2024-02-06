import React, {useEffect, useImperativeHandle, useState} from "react";

import Select from "react-select";
import {addressSearch} from "../../Requests";

let cancelValue = {
    value: {
        objectGuid: '',
        objectId: '',
        objectLevel: '',
        objectLevelText: 'Субъект РФ',
        text: ''
    },
    label: ''
}

const GarItem = React.forwardRef(({ parentObjectId, onGUIDChange }, ref) => {

    const [label, setLabel] = useState(parentObjectId === 0 ? 'Субъект РФ' : 'Следующий элемент адреса')
    const [query, setQuery] = useState('')
    const [objectGuid, setObjectGuid] = useState('invalid')
    const [objectId, setObjectId] = useState('')
    const [objectLevel, setObjectLevel] = useState('')
    const [selectedValue, setSelectedValue] = useState({})

    const [options, setOptions] = useState([])

    useEffect(() => {

        addressSearch(parentObjectId, query)
            .then((result) => {
                //console.log(result);
                setAddrsToOptions(result);
            })
            .catch((error) => {
                console.log('Error:', error.message);
            });
    }, [query]);

    useEffect(() => {
        //console.log(selectedValue);
    }, [selectedValue]);

    useImperativeHandle(ref, () => ({
        cancelAddress() {
            setSelectedValue(cancelValue);
            setLabel(cancelValue.value.objectLevelText);
            setObjectLevel(cancelValue.value.objectLevel);
            setObjectGuid(cancelValue.value.objectGuid);
            setObjectId(cancelValue.value.objectId);
        },
    }), []);

    function setAddrsToOptions(result) {
        let opt = [
            ...result.map((item) => (
                {
                    value: {
                        objectGuid: item.objectGuid,
                        objectId: item.objectId,
                        objectLevel: item.objectLevel,
                        objectLevelText: item.objectLevelText,
                        text: item.text
                    },
                    label: item.text
                }
            ))]
        setOptions([...opt]);
    }

    useEffect(() => {
        if (objectGuid !== 'invalid') {
            onGUIDChange({
                guid: objectGuid
            })
        }
    }, [objectGuid]);

    function handleOptionChange(e) {
        setSelectedValue(e);
        setLabel(e.value.objectLevelText);
        setObjectLevel(e.value.objectLevel);
        setObjectGuid(e.value.objectGuid);
        setObjectId(e.value.objectId);
    }

    function handleInputChange(e) {
        setQuery(e)
    }

    return (
        <div>
            <div className='mb-2'>
                <label>{label}</label>

                <Select
                    options={options}
                    isSearchable
                    onChange={handleOptionChange}
                    onInputChange={handleInputChange}
                    placeholder="Поиск"
                    value={selectedValue}

                />
            </div>

            {objectId !== '' && objectLevel !== 'Building' && (
                <GarItem parentObjectId={objectId} onGUIDChange={onGUIDChange} />
            )
            }

        </div>
    )
})

export default GarItem;

