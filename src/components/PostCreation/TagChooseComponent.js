import React, {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import {getTags} from "../../Requests";

let chosenTagsNotState = [];
export default function TagChooseComponent({onTagsChange}) {

    const [tags, setTags] = useState([])
    const [chosenTags, setChosenTags] = useState([])

    useEffect(() => {
        function fetchTags()
        {
            getTags()
                .then((result) => {
                    setTags(result);
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                });
        }
        fetchTags();

    }, []);

    function handleTagChange(e) {

        if (e.target.checked)
        {
            chosenTagsNotState.push(e.target.id);
        }
        else
        {
            const index = chosenTagsNotState.indexOf(e.target.id);
            if (index !== -1) {
                chosenTagsNotState.splice(index, 1);
            }
        }
        onTagsChange(chosenTagsNotState)
    }

    return (
        <div className="list-group" style={{ maxHeight: '100px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
            {tags.map((tag, index) => (
                <Form.Check
                    className="m-1"
                    key={index}
                    type="checkbox"
                    id={tag.id}
                    label={tag.name}
                    onChange={handleTagChange}
                />
            ))}
        </div>
    )
}

