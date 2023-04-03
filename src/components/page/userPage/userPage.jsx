import React, { useEffect, useState } from "react";
import API from "../../../api";
import Comments from "../../ui/comments";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import UserCard from "../../ui/userCard";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);
    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};

UserPage.propTypes = { userId: PropTypes.string };

export default UserPage;
