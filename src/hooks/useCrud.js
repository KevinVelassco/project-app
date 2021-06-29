import { useState } from "react";
import axios from "../helpers/axios";

export const useCrud = ({ url, form, validateForm }) => {

    const [loadingCrud, setLoadingCrud] = useState(false);

    const handleCreate = (e) => {
        e.preventDefault()

        const isValid = validateForm();

        if (isValid) {
            setLoadingCrud(true);

            axios.post(url, {
                body: form
            }).then(res => {
                res.err
                    ? alert(res.errors)
                    : alert('Registro creado correctamente.');

                setLoadingCrud(false);
            });
        }
    }

    return {
        loadingCrud,
        handleCreate
    }
}
