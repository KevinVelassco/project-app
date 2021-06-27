import { useState, useEffect } from "react";
import axios from '../helpers/axios';

export const useFetch = (url) => {

    const [state, setState] = useState({ data: [], loading: true, error: null });

    useEffect(() => {
        axios.get(url)
            .then(res => setState({
                data: res.rows,
                loading: false,
                error: null
            })
            ).catch(error => {
                setState({
                    data: [],
                    loading: false,
                    error: error
                })
            })
    }, [url]);

    return state;
}
