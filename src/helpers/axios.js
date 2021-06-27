const axios = () => {

    const helpFetch = (url, options = {}) => {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }

        options.hedears = options.hedears
            ? { ...defaultHeaders, ...options.hedears }
            : defaultHeaders;

        options.method = options.method || 'GET';

        options.body = JSON.stringify(options.body) ?? false;

        if (!options.body) delete options.body;

        return fetch(url, options)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .catch(err => {
                if (err.status === 500) {
                    return err.json().then(res => {
                        const errors = res.errors ? { errors: res.errors[0].message } : res;
                        return {
                            err: true,
                            ...errors
                        };
                    })
                } else {
                    return {
                        err: true,
                        status: err.status,
                        message: err.statusText
                    }
                }
            });
    }

    const get = (url, options = {}) => helpFetch(url, options);

    const post = (url, options = {}) => {
        options.method = 'POST';
        return helpFetch(url, options);
    };

    const put = (url, options = {}) => {
        options.method = 'PUT';
        return helpFetch(url, options);
    }

    const del = (url, options = {}) => {
        options.method = 'DELETE';
        return helpFetch(url, options);
    }

    return {
        get,
        post,
        put,
        del
    }
}

export default axios();