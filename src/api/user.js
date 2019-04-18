const makeGetToken = (fetch, { baseUrl }) => (email, password) => {

    const data = new FormData()

    data.append('email', email)
    data.append('password', password)

    return fetch(`${baseUrl}/login`, {
        method: 'POST',
        body: data,
    })
    .then(res => res.json())
}

export { makeGetToken }