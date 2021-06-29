import * as yup from 'yup';

export const userValidation = yup.object().shape({
    name: yup.string().min(8).required(),
    email: yup.string().email().required(),
    identification: yup.number().required().positive().integer(),
    phone: yup.number().positive().integer()
});