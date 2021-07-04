import React, { useEffect, useState } from 'react';

export const UserForm = ({ form,
    errors,
    loadingCrud,
    handleCreate,
    handleUpdate,
    handleChange,
    setIsNewRecord }) => {

    const [state, setState] = useState({
        title: '',
        method: handleCreate
    });

    const { title, method } = state;

    useEffect(() => {
        form.id
            ?
            setState({
                title: 'Actualización de usuario',
                method: handleUpdate
            })
            : setState({
                title: 'Registro de usuarios',
                method: handleCreate
            });
    }, [form.id, handleCreate, handleUpdate])

    return (
        <div className="col-12 pb-3">
            <h3>{title}</h3>
            <form onSubmit={method}>
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
                <button
                    type="button"
                    onClick={() => setIsNewRecord(false)}
                    className="btn btn-danger">
                    Cancelar
                </button>
            </form>
        </div>
    )
}
