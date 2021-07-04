import React, { useMemo } from "react";

import { useFetch } from '../../hooks/useFetch';
import { DataTable } from '../../components/table/DataTable';
import { useForm } from "../../hooks/useForm";
import { userValidation } from "../../validations/users/userValidation";
import { initialForm } from "./initialForm";
import { useCrud } from "../../hooks/useCrud";
import { UserForm } from "./UserForm";

const url = "https://node-sequelize-api-pro.herokuapp.com/users";

export const Users = () => {

    const { data, loading } = useFetch(url);

    const columns = useMemo(() => [
        { column: 'id', label: 'Id' },
        { column: 'name', label: 'Name' },
        { column: 'email', label: 'Email' },
        { column: 'identification', label: 'Identification' },
        { column: 'phone', label: 'Phone' }
    ], []);

    const {
        form,
        setForm,
        errors,
        handleChange,
        validateForm
    } = useForm(initialForm, userValidation);

    const { loadingCrud,
        isNewRecord,
        setIsNewRecord,
        handleCreate,
        handleSearchById,
        handleUpdate,
        handleDelete } = useCrud({
            endpoint: '/users',
            form,
            setForm,
            validateForm
        });

    const options = useMemo(() => ({
        update: handleSearchById,
        delete: handleDelete,
    }), [handleDelete, handleSearchById]);

    return (
        <div className="container-fluid p-5">
            <div className="row">
                {
                    isNewRecord ?
                        <UserForm form={form}
                            errors={errors}
                            loadingCrud={loadingCrud}
                            handleCreate={handleCreate}
                            handleUpdate={handleUpdate}
                            handleChange={handleChange}
                            setIsNewRecord={setIsNewRecord} />
                        :
                        <div className="col-12">
                            <button
                                type="button"
                                onClick={() => {
                                    setForm(initialForm);
                                    setIsNewRecord(true);
                                }}
                                className="btn btn-success mb-2">
                                Nuevo
                            </button>

                            <DataTable columns={columns}
                                records={data}
                                loading={loading}
                                options={options} />
                        </div>
                }
            </div>
        </div>
    );
}
