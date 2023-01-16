import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, toggleBookmark, userId }) => {
    return (
        <button
            className="btn btn-outline-none"
            onClick={() => toggleBookmark(userId)}
        >
            {status ? (
                <i className="bi bi-bookmark-star-fill"></i>
            ) : (
                <i className="bi bi-bookmark-star"></i>
            )}
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool,
    toggleBookmark: PropTypes.func,
    userId: PropTypes.string
};

export default BookMark;
