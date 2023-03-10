import React from "react";
import PropTypes from "prop-types";

const SearchForm = ({ handleSearch, searchValue }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
                value={searchValue}
                className="form-control"
            />
        </div>
    );
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func,
    searchValue: PropTypes.string
};

export default SearchForm;
