const makeCheckCharacter = (fetch, { baseUrl, token }) => file => {
    const data = new FormData()
    data.append('file', file)

    return fetch(`${baseUrl}/character-checker`, {
        method: 'POST',
        headers: {
            'AUTH-TOKEN': token
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data.result
    })
}

export { makeCheckCharacter }