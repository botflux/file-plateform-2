<template>
    <v-container>
        <v-layout row justify-center>
            <v-flex xs12 md6 lg4 xl2>
                <login-form @connect="onSuccess" @error="onError" />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import LoginForm from '../components/auth/login-form.vue'

import { createNamespacedHelpers } from 'vuex'
import * as types from '../stores/types'

const { mapActions, mapState } = createNamespacedHelpers('user')

export default {
    components: {
        LoginForm
    },
    computed: {
        ...mapState({
            token: state => state.token
        })
    },
    methods: {
        ...mapActions([
            types.SET_TOKEN,
            types.SET_PAYLOAD,
            types.ADD_FLASH_MESSAGE
        ]),
        onError () {
            this[types.ADD_FLASH_MESSAGE] ({
                type: 'error',
                message: 'Identifiants incorrects'
            })
        },
        onSuccess (data) {
            this[types.SET_TOKEN] (data.token)
            this[types.SET_PAYLOAD] (data.payload)
            this[types.ADD_FLASH_MESSAGE] ({
                type: 'success',
                message: 'Vous êtes connecté'
            })

            // this.$route.push('/')
        }
    },
}
</script>