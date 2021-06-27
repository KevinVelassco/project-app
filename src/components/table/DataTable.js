import React from 'react';
import PropTypes from 'prop-types';

export const DataTable = ({ columns, records, loading }) => {
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
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    {
                                        columns.map(({ column, label }) => (
                                            <th key={column} scope="col">{label}</th>
                                        ))
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
