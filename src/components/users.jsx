import React, { useState, useEffect } from "react";
import API from "../api/index";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import User from "./user";

const Users = () => {
    const [users, setUsers] = useState();
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const filteredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;
    const count = users ? filteredUsers.length : 0;
    const userCrop = users
        ? paginate(filteredUsers, currentPage, pageSize)
        : [];

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

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

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        valueProperty="_id"
                        contentProperty="name"
                    />
                    <button
                        className="btn btn-outline-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}

            {users ? (
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {count > 0 && (
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
                                {userCrop.map((user) => (
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
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default Users;
