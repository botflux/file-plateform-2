<template>
    <v-card>
        <v-card-title primary-title>
            <div class="mx-auto text-xs-center">
                <h1 class="headline mb-0">File-Plateform</h1>
                <h2 class="subheading">Connexion à File-Plateform</h2>
            </div>
        </v-card-title>

        <v-form>
            <v-container>
                <v-text-field
                    box
                    v-model="email"
                    label="Email"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    :error-messages="emailErrors"
                ></v-text-field>

                <v-text-field
                    box
                    v-model="password"
                    label="Mot de passe"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    @click:append="show = !show"
                ></v-text-field>

                <v-btn @click="submit" color="primary">Se connecter</v-btn>
                <v-progress-circular :wdith="3" color="primary" indeterminate v-if="isLoading"></v-progress-circular>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

import { createNamespacedHelpers } from 'vuex'
import * as types from '../../stores/types'

const { mapActions, mapState } = createNamespacedHelpers('user')

export default {
    mixins: [validationMixin],
    validations: {
        email: { required, email },
    }, 
    data () {
        return {
            email: '',
            password: '',
            show: false,
            isLoading: false
        }
    },
    computed: {
        emailErrors () {
            let errors = []

            if (!this.$v.email.$dirty) return errors

            errors = (!this.$v.email.email) ? [...errors, `L'adresse e-mail doit être valide`] : errors
            errors = (!this.$v.email.required) ? [...errors, `L'adresse e-mail est requise`] : errors
            return errors
        },
        ...mapState({
            token: state => state.token
        })
    },
    methods: {
        submit () {
            this.$v.$touch()

            if (!this.$v.$anyError) {
                this.isLoading = true

                this.$makeAPI().getToken(this.email, this.password)
                    .then(data => {
                        this.$emit('connect', data)
                    })
                    .catch(e => {
                        this.$emit('error', e)
                    })
                    .finally (() => {
                        this.isLoading = false
                    })
            }
        },
        ...mapActions([
            types.ADD_FLASH_MESSAGE,
        ])
    },
}
</script>