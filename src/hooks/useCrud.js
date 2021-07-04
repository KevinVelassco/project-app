import { useState } from "react";
import axios from "../helpers/axios";

const url = "https://node-sequelize-api-pro.herokuapp.com";

export const useCrud = ({ endpoint, form, validateForm }) => {

    const [loadingCrud, setLoadingCrud] = useState(false);
    const [isNewRecord, setIsNewRecord] = useState(false);

    const handleCreate = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            setLoadingCrud(true);

            axios.post(`${url}${endpoint}`, {
                body: form
            }).then(res => {
                res.err
                    ? alert(res.errors)
                    : alert('Registro creado correctamente.');

                setLoadingCrud(false);
            });
        }
    }

    const handleDelete = (id) => {
        axios.del(`${url}${endpoint}/${id}`)
            .then(res => {
                res.err
                    ? alert(res.errors)
                    : alert('Registro eliminado correctamente.');
            });
    }

    return {
        loadingCrud,
        isNewRecord,
        setIsNewRecord,
        handleCreate,
        handleDelete
    }
}
