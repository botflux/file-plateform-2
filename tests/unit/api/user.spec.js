import * as user from '../../../src/api/user'

describe('user.js', () => {
    describe('#makeGetToken', () => {
        it ('calls fetch with the correct url', async () => {
            const fakeFetch = jest.fn(() => Promise.resolve({
                text () {
                    return ''
                }
            }))

            const getToken = user.makeGetToken(fakeFetch, { baseUrl: 'https://domain.com/user' })

            await getToken('', '')

            expect(fakeFetch).toBeCalled()
            expect(fakeFetch).toBeCalledWith('https://domain.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: { email: '', password: '' },
            })
        })

        it ('retuns calls text() on the response object', async () => {
            const text = jest.fn(() => '') 
            const fakeFetch = () => Promise.resolve({
                text 
            })

            const getToken = user.makeGetToken(fakeFetch, { baseUrl: 'https://domain.com/user' })
            await getToken('', '')
            expect(text).toBeCalled()
        })
    })
})