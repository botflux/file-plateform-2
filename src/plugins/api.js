import { makeGetToken } from '../api/user'
import { makeCheckCharacter } from '../api/character-checker'

const APIPlugin = {}

APIPlugin.install = (Vue, { getToken = () => '', baseUrl } = {}) => {
    Vue.prototype.$makeAPI = () => ({
        getToken: makeGetToken(window.fetch, { baseUrl }),
        checkCharacter: makeCheckCharacter(window.fetch, { baseUrl, token: getToken() })
    })
}

export default APIPlugin