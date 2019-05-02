import { makeGetToken } from '../api/user'
import { makeCheckCharacter } from '../api/character-checker'
import { makeReadHeaders } from '../api/csv'
import { makeCitiesExist } from '../api/cities'

const APIPlugin = {}

APIPlugin.install = (Vue, { getToken = () => '', baseUrl } = {}) => {
    Vue.prototype.$makeAPI = () => ({
        getToken: makeGetToken(window.fetch, { baseUrl }),
        checkCharacter: makeCheckCharacter(window.fetch, { baseUrl, token: getToken() }),
        readHeaders: makeReadHeaders(window.fetch, { baseUrl, token: getToken() }),
        citiesExist: makeCitiesExist(window.fetch, { baseUrl, token: getToken() })
    })
}

export default APIPlugin