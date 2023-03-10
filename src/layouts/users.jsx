import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserFormEdit from "../components/ui/userFormEdit";

const UsersLayout = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {userId ? (
                edit ? (
                    <UserFormEdit />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default UsersLayout;
