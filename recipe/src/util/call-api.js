import config from '../config';

export default function callApi(endpoint, token, options, payload) {
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    console.log('url', `${config.API_URL}${endpoint}`)
    console.log('API payload: ', payload)

    return fetch(`${config.API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...authHeaders,
        },
        body: JSON.stringify(payload),
        ...options,
    })
        .then(response => response.json())
        .then((json) => {
            if (json.success) {
                return json;
            }
            throw new Error(json.message);
        });
}