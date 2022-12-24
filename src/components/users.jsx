import React, { useState } from "react";
import API from "../api";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        const filteredUsers = users.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
    };
    const renderPhrase = (number) => {
        const basePhrase = " с тобой сегодня";
        const lastDigit = Number(String(number).slice(-1));
        if (number === 0) {
            return "Никто с тобой не тусанёт";
        } else if (number === 1 || (number > 20 && lastDigit === 1)) {
            return number + " человек тусанёт" + basePhrase;
        } else if (
            (number >= 2 && number <= 4) ||
            (number > 20 && lastDigit >= 2 && lastDigit <= 4)
        ) {
            return number + " человека тусанут" + basePhrase;
        } else if (number >= 5 && number <= 20) {
            return number + " человек тусанут" + basePhrase;
        }
    };

    return (
        <>
            <h1>
                <span
                    className={`badge bg-${
                        users.length > 0 ? "primary" : "danger"
                    } m-3`}>
                    {renderPhrase(users.length)}
                </span>
            </h1>

            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((q) => (
                                        <span
                                            key={q._id}
                                            className={`badge bg-${q.color} m-2`}>
                                            {q.name}
                                        </span>
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;
