import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../api";
import QualitiesList from "./qualitiesList";

const User = () => {
    const { userId } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleClick = () => {
        history.push("/users");
    };

    return (
        <>
            {user ? (
                <div className="container">
                    <h1>{user.name}</h1>
                    <h3>Профессия: {user.profession.name}</h3>
                    <div>
                        <QualitiesList qualities={user.qualities} />
                    </div>
                    <div>Встретился, раз: {user.completedMeetings}</div>
                    <div>Рейтинг: {user.rate}</div>
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleClick}
                    >
                        Все пользователи
                    </button>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

export default User;
