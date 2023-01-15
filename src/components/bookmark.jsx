import React from "react";

const BookMark = ({ status, toggleBookmark, userId }) => {
    return (
        <button
            className="btn btn-outline-none"
            onClick={() => toggleBookmark(userId)}>
            {status ? (
                <i className="bi bi-bookmark-star-fill"></i>
            ) : (
                <i className="bi bi-bookmark-star"></i>
            )}
        </button>
    );
};

export default BookMark;
