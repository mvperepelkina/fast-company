import React, { useState } from "react";
import API from "../api";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        const filteredUsers = users.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
    };

    const toggleBookmark = (id) => {
        const updatedUsers = users.map((u) =>
            u._id === id ? { ...u, bookmark: !u.bookmark } : u
        );
        setUsers(updatedUsers);
    };

    return (
        <>
            <SearchStatus length={users.length} />
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User
                                key={user._id}
                                user={user}
                                handleDelete={handleDelete}
                                toggleBookmark={toggleBookmark}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default Users;
