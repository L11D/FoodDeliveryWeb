import React, {useState} from "react";

export default function WasEditedBlock ({ editTime }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ color: "grey", fontSize: '13px' }}
        >
      {isHovered ? ` (изменен ${editTime})` : ' (изменен)'}
    </span>
    );
};