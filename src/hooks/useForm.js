import { useState } from "react";

export const useForm = (initialState = {}, schema) => {

    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
        setForm({
            ...form,
            [target.name]: target.value
        });
    }

    const validateForm = () => {
        let errors = {};

        try {
            schema.validateSync(form, { abortEarly: false });
        } catch ({ inner }) {
            errors = inner.reduce((acc, err) => (
                { ...acc, [err.path]: err.message }
            ), {});
        }

        setErrors(errors);

        return Object.keys(errors).length === 0
            ? true
            : false;
    };

    return {
        form,
        errors,
        handleChange,
        validateForm
    }
}
