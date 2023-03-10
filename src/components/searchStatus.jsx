import React from "react";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const basePhrase = " с тобой сегодня";
        const lastDigit = Number(String(number).slice(-1));
        if (number === 0) {
            return "Никто с тобой не тусанёт";
        } else if (number === 1 || (number > 20 && lastDigit === 1)) {
            return number + " человек тусанёт" + basePhrase;
        } else if (
            (number >= 2 && number <= 4) ||
            (number > 20 && lastDigit >= 2 && lastDigit <= 4)
        ) {
            return number + " человека тусанут" + basePhrase;
        } else if (number >= 5 && number <= 20) {
            return number + " человек тусанут" + basePhrase;
        }
    };
    return (
        <h1>
            <span
                className={`badge bg-${length > 0 ? "primary" : "danger"} m-3`}>
                {renderPhrase(length)}
            </span>
        </h1>
    );
};

export default SearchStatus;
