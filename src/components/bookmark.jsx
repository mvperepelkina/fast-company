import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, onToggleBookmark, userId }) => {
    return (
        <button
            className="btn btn-outline-none"
            onClick={() => onToggleBookmark(userId)}
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
    onToggleBookmark: PropTypes.func,
    userId: PropTypes.string
};

export default BookMark;
