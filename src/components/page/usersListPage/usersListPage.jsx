import React, { useState, useEffect } from "react";
import API from "../../../api/index";
import { paginate } from "../../../utils/paginate";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchForm from "../../searchForm";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";

const UsersListPage = () => {
    const [users, setUsers] = useState();
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchValue, setSearchValue] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const pageSize = 8;
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
        : searchValue
        ? users.filter((user) =>
              user.name.toLowerCase().includes(searchValue.toLowerCase())
          )
        : users;

    const count = users ? filteredUsers.length : 0;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = users ? paginate(sortedUsers, currentPage, pageSize) : [];

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleDelete = (userId) => {
        const filteredUsers = users.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
    };

    const handleToggleBookmark = (id) => {
        const updatedUsers = users.map((u) =>
            u._id === id ? { ...u, bookmark: !u.bookmark } : u
        );
        setUsers(updatedUsers);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleProfessionSelect = (item) => {
        setSearchValue("");
        setSelectedProf(item);
    };

    const clearFilter = () => {
        setSelectedProf();
    };

    const handleSearch = ({ target }) => {
        clearFilter();
        setSearchValue(target.value);
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
                    <SearchForm
                        handleSearch={handleSearch}
                        searchValue={searchValue}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
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

export default UsersListPage;
