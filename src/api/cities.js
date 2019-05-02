const makeCitiesExist = (fetch, { baseUrl, token }) => (file, headers) => {
    const data = new FormData ()
    data.append('file', file)
    data.append('columnNames', headers.join(','))

    return fetch(`${baseUrl}/cities/exists`, {
        method: 'POST',
        headers: {
            'AUTH-TOKEN': token
        },
        body: data
    })
    .then(response => response.json())
}

export { makeCitiesExist }