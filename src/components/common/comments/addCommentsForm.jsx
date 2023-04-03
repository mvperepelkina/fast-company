import React, { useEffect, useState } from "react";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import SelectField from "../form/selectField";
import PropTypes from "prop-types";
import TextAreaField from "../form/textAreaField";

const initialData = { userId: "", content: "" };

const AddCommentsForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите пользователя"
            }
        },
        content: {
            isRequired: {
                message: "Данное поле не может быть пустым"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    const clearCommentsForm = () => {
        setData(initialData);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearCommentsForm();
    };
    console.log(users);

    const arrayOfUsers =
        users && Array.isArray(users)
            ? users.map((user) => ({ label: user.name, value: user._id }))
            : Object.keys(users).map((userId) => ({
                  label: users[userId].name,
                  value: users[userId]._id
              }));
    console.log(arrayOfUsers);
    return (
        <div>
            <h3>New comment</h3>
            <form onSubmit={handleSubmit}>
                <SelectField
                    onChange={handleChange}
                    options={arrayOfUsers}
                    name="userId"
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    );
};

AddCommentsForm.propTypes = { onSubmit: PropTypes.func };

export default AddCommentsForm;
