import React from "react";
import { useParams } from "react-router-dom";
import User from "../components/user";
import UsersList from "../components/usersList";

const UsersLayout = () => {
    const { userId } = useParams();
    return <>{userId ? <User /> : <UsersList />}</>;
};

export default UsersLayout;
