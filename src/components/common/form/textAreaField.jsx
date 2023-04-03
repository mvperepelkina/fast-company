import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, type, value, name, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    value={value}
                    name={name}
                    onChange={handleChange}
                    className={getInputClasses()}
                />

                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextAreaField.defaultProps = { type: "text" };

TextAreaField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextAreaField;
