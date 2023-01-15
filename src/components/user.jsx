import React from "react";
import BookMark from "./bookmark";
import Quality from "./quality";

const User = ({ user, handleDelete, toggleBookmark }) => {
    const { _id, name, qualities, profession, completedMeetings, rate } = user;
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((q) => (
                    <Quality
                        key={q._id}
                        color={q.color}
                        name={q.name}
                    />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td>
                <BookMark
                    status={user.bookmark}
                    toggleBookmark={toggleBookmark}
                    userId={user._id}
                />
            </td>
            <td>
                <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-danger">
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default User;
