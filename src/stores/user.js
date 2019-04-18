import * as types from './types'

const state = {
    token: '',
    payload: {},

    flashMessages: []
}

const getters = {
    [types.IS_ADMIN]: state => state.payload.role == 'ROLE_ADMIN',
    [types.IS_ANON]: state => Object.keys(state.payload) === 0 || !state.token || state.token.length <= 0,
    [types.IS_USER]: state => state.payload.role == 'ROLE_USER',
}

const mutations = {
    [types.SET_TOKEN]: (state, token) => state.token = token,
    [types.ADD_FLASH_MESSAGE]: (state, flashMessage) => state.flashMessages = [...state.flashMessages, {...flashMessage, at: + new Date()}],
    [types.CLEAR_FLASH_MESSAGES]: state => state.flashMessages = [],
    [types.REMOVE_FLASH_MESSAGE]: (state, flashToRemove) => state.flashMessages = state.flashMessages.filter(m => m.at != flashToRemove.at),
    [types.SET_PAYLOAD]: (state, payload) => state.payload = payload,
    [types.REMOVE_PAYLOAD]: state => state.payload = {},
    [types.REMOVE_TOKEN]: state => state.token = ''
}

const actions = {
    [types.SET_TOKEN]: ({ commit }, token) => commit(types.SET_TOKEN, token),
    [types.ADD_FLASH_MESSAGE]: ({ commit }, flashMessage) => commit(types.ADD_FLASH_MESSAGE, flashMessage),
    [types.CLEAR_FLASH_MESSAGES]: ({ commit }) => commit(types.CLEAR_FLASH_MESSAGES),
    [types.REMOVE_FLASH_MESSAGE]: ({ commit }, flashToRemove) => commit(types.REMOVE_FLASH_MESSAGE, flashToRemove),
    [types.DISCONNECT]: ({ commit }) => {
        commit(types.REMOVE_PAYLOAD)
        commit(types.REMOVE_TOKEN)
    },
    [types.SET_PAYLOAD]: ({ commit }, payload) => commit(types.SET_PAYLOAD, payload)
}

export default {
    namespaced: true,
    state,
    getters, 
    mutations,
    actions
}