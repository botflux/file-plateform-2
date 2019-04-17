import * as types from './types'

const state = {
    token: ''
}

const getters = {}

const mutations = {
    [types.SET_TOKEN]: (state, token) => state.token = token
}

const actions = {
    [types.SET_TOKEN]: ({ commit }, token) => commit(types.SET_TOKEN, token)
}

export default {
    namespaced: true,
    state,
    getters, 
    mutations,
    actions
}