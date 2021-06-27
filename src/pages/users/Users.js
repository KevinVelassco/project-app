import React from "react";
import { useFetch } from '../../hooks/useFetch';
import { DataTable } from '../../components/table/DataTable';
import { useForm } from "../../hooks/useForm";
import axios from "../../helpers/axios";

const url = "https://node-sequelize-api-pro.herokuapp.com/users";

export const Users = () => {

    const { data: users, loading } = useFetch(url);

    const columns = [
        { column: 'id', label: 'Id' },
        { column: 'name', label: 'Name' },
        { column: 'email', label: 'Email' },
        { column: 'identification', label: 'Identification' },
        { column: 'phone', label: 'Phone' }
    ];

    const { form, handleChange } = useForm({
        name: '',
        email: '',
        identification: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(url, form)
            .then(console.log);

        console.log(form);
    }

    return (
        <div className="container-fluid p-5">
            <div className="row">
                <div className="col-12 pb-3">
                    <h3>Registro de usuarios</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="name"
                            className="form-control mb-2"
                            placeholder="Name"
                            autoComplete="off"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            name="email"
                            className="form-control mb-2"
                            autoComplete="off"
                            placeholder="Email"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            name="identification"
                            className="form-control mb-2"
                            placeholder="Identification"
                            autoComplete="off"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            name="phone"
                            className="form-control mb-2"
                            placeholder="Phone"
                            autoComplete="off"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </form>
                </div>
                <div className="col-12">
                    <DataTable columns={columns} records={users} loading={loading} />
                </div>
            </div>
        </div>
    );
}
