const makeGetToken = (fetch, { baseUrl }) => (email, password) => {
    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: { email, password },
    })
    .then(res => res.text())
}

export { makeGetToken }