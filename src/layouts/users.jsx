import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import UserFormEdit from "../components/ui/userFormEdit";

const UsersLayout = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {userId ? (
                edit ? (
                    <UserFormEdit />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default UsersLayout;
