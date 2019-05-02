const makeReadHeaders = (fetch, { baseUrl, token }) => file => {
    const data = new FormData ()
    data.append('file', file)

    return fetch(`${baseUrl}/csv/read-headers`, {
        method: 'POST',
        headers: {
            'AUTH-TOKEN': token
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.error && data.error === true) {
            console.log(data)
            throw new Error (data.message)
        }
            

        return data.body.headers
    })
}

export { makeReadHeaders }