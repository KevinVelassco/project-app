import React from "react";

import { useFetch } from '../../hooks/useFetch';
import { DataTable } from '../../components/table/DataTable';
import { useForm } from "../../hooks/useForm";
import { userValidation } from "../../validations/users/userValidation";
import { initialForm } from "./initialForm";
import { useCrud } from "../../hooks/useCrud";

const url = "https://node-sequelize-api-pro.herokuapp.com/users";

export const Users = () => {

    const { data, loading } = useFetch(url);

    const columns = [
        { column: 'id', label: 'Id' },
        { column: 'name', label: 'Name' },
        { column: 'email', label: 'Email' },
        { column: 'identification', label: 'Identification' },
        { column: 'phone', label: 'Phone' }
    ];

    const {
        form,
        errors,
        handleChange,
        validateForm
    } = useForm(initialForm, userValidation);

    const { loadingCrud, handleCreate } = useCrud({ url, form, validateForm });

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-12 pb-3">
                    <h3>Registro de usuarios</h3>
                    <form onSubmit={handleCreate}>
                        <input
                            name="name"
                            className="form-control mb-2"
                            placeholder="Name"
                            autoComplete="off"
                            value={form.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p>{errors.name}</p>}

                        <input
                            name="email"
                            className="form-control mb-2"
                            autoComplete="off"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p>{errors.email}</p>}

                        <input
                            name="identification"
                            className="form-control mb-2"
                            placeholder="Identification"
                            autoComplete="off"
                            value={form.identification}
                            onChange={handleChange}
                        />
                        {errors.identification && <p>{errors.identification}</p>}

                        <input
                            name="phone"
                            className="form-control mb-2"
                            placeholder="Phone"
                            autoComplete="off"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <p>{errors.phone}</p>}

                        <button className="btn btn-primary" type="submit" disabled={loadingCrud}>
                            {
                                loadingCrud
                                    ? <> <span className="spinner-border spinner-border-sm" /> loading</>
                                    : <>Guardar</>
                            }
                        </button>
                    </form>
                </div>
                <div className="col-12">
                    <DataTable columns={columns} records={data} loading={loading} />
                </div>
            </div>
        </div>
    );
}
