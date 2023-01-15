import React from "react";

const Quality = ({ color, name }) => {
    return <span className={`badge bg-${color} m-2`}>{name}</span>;
};

export default Quality;
