import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const DataTable = ({ columns, records, loading, options = {} }) => {

    /*const isEmptyOptions = useMemo(() => {
        if (Object.keys(options) === 0) return true;
        return Object.values(options).find(value => value) ? false : true;
    }, [options]);*/

    const isEmptyOptions = useMemo(() =>
        Object.keys(options).length === 0
            ? true :
            false,
        [options]);

    const [actions, setActions] = useState([]);

    useEffect(() => {
        if (!isEmptyOptions) {
            const allowedOptions = [
                { option: 'update', label: 'Actualizar', color: 'primary' },
                { option: 'delete', label: 'Eliminar', color: 'danger' }
            ];

            const optionsReducer = allowedOptions.reduce((accumulator, currentValue) => {
                return [...accumulator, currentValue.option]
            }, []);

            const invalidOption = Object.keys(options)
                .find(e => {
                    return !optionsReducer.includes(e);
                });

            if (invalidOption) {
                throw new Error(`Invalid ${invalidOption} property in the options of the component DataTable`);
            }

            const approvedOptions = allowedOptions.reduce((acc, currentValue) => {
                const method = options[currentValue.option];
                return method ? [...acc, { ...currentValue, method }] : acc;
            }, []);

            setActions(approvedOptions);
        }
    }, [isEmptyOptions, options]);

    return (
        <>
            {
                (loading)
                    ?
                    <div className="row">
                        <div className="col">
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="table-responsive-sm">
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    {
                                        columns.map(({ column, label }) => (
                                            <th key={column} scope="col">{label}</th>
                                        ))
                                    }

                                    {
                                        !isEmptyOptions && <th key="actions">actions</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    records.map(record => (
                                        <tr key={record.id}>
                                            {
                                                columns.map(({ column }) => (
                                                    <td key={column}>{record[column]}</td>
                                                ))
                                            }

                                            {
                                                !isEmptyOptions &&
                                                <td>
                                                    {
                                                        actions.map(({ option, label, color, method }) => (
                                                            <button onClick={() => method(record.id)} key={option} className={`btn btn-${color}`}>{label}</button>
                                                        ))
                                                    }
                                                </td>
                                            }
                                        </tr>
                                    )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    records: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
}
