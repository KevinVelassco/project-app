import { useCallback, useState } from "react";
import axios from "../helpers/axios";

const url = "https://node-sequelize-api-pro.herokuapp.com";

export const useCrud = ({ endpoint, form, setForm, validateForm }) => {

    const [loadingCrud, setLoadingCrud] = useState(false);
    const [isNewRecord, setIsNewRecord] = useState(false);

    const handleCreate = useCallback((e) => {
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
    }, [endpoint, form, validateForm]);

    const handleDelete = useCallback((id) => {
        axios.del(`${url}${endpoint}/${id}`)
            .then(res => {
                res.err
                    ? alert(res.errors)
                    : alert('Registro eliminado correctamente.');
            });
    }, [endpoint]);

    const handleSearchById = useCallback(id => {
        setLoadingCrud(true);

        axios.get(`${url}${endpoint}/${id}`).then(res => {
            res.err && alert(res.errors);
            setLoadingCrud(false);
            setForm(res);
            setIsNewRecord(true);
        });

    }, [endpoint, setForm]);

    const handleUpdate = useCallback(e => {
        e.preventDefault();

        const isValid = validateForm();

        if (isValid) {
            setLoadingCrud(true);

            const body = { ...form };

            const { id } = body;

            delete body.id;
            delete body.createdAt;
            delete body.updatedAt;

            axios.put(`${url}${endpoint}/${id}`, {
                body
            }).then(res => {
                res.err
                    ? alert(res.errors)
                    : alert('Registro actualizado correctamente.');

                setLoadingCrud(false);
            });
        }
    }, [endpoint, form, validateForm]);

    return {
        loadingCrud,
        isNewRecord,
        setIsNewRecord,
        handleCreate,
        handleSearchById,
        handleUpdate,
        handleDelete
    }
}
