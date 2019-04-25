<template>
    <base-tool>
        <template v-slot:modal>
            <!-- Loader -->
            <div class="text-cs-center">
                <v-dialog v-model="isLoading" persistent width="300">
                    <v-card>
                        <v-card-text>
                            Fichier en cours de traitement
                            <v-progress-linear
                                indeterminate
                                color="primary"
                                class="mb-0"
                            ></v-progress-linear>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </div>
            <!-- /Loader -->
        </template>
        <template v-slot:headline>
            <v-flex>
                <v-card>
                    <v-card-title>
                        <div>
                            <span class="caption text-uppercase">Fichier</span>
                            <h1 class="display-1">Vérification de caractère</h1>
                        </div>
                    </v-card-title>
                    <v-card-text>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                    </v-card-text>
                </v-card>
            </v-flex>
        </template>

        <template v-slot:body>
            <v-flex>
                <v-stepper v-model="currentStep">
                    <v-stepper-header>
                        <v-stepper-step step="1" :complete="currentStep > 0">
                            Renseigner votre fichier
                        </v-stepper-step>

                        <v-divider></v-divider>
                        
                        <v-stepper-step step="2" :complete="currentStep > 1">
                            Résultat
                        </v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                        <!--  File -->
                        <v-stepper-content step="1">
                            <v-card>
                                <v-card-title>
                                    <h2>Renseignez votre fichier</h2>
                                </v-card-title>
                                <v-card-title>
                                    <input type="file" @change="changeFile($event)" class="hidden" ref="fileInput" />
                                    <v-btn color="primary" @click="$refs.fileInput.click()">Choisissez un fichier</v-btn>
                                    <span class="caption">{{ currentFileName }}</span>
                                </v-card-title>
                            </v-card>
                        </v-stepper-content>
                        <!-- /File -->

                        <!-- Result -->
                        <v-stepper-content step="2">
                            <v-card>
                                <v-card-title>
                                    <h2>Résultat</h2>
                                </v-card-title>
                                
                                <v-data-table :headers="headers" :items="issues" v-if="isResponseValid">
                                    <template v-slot:items="props">
                                        <td>{{ props.item.id }}</td>
                                        <td>{{ props.item.line }}</td>
                                        <td>{{ props.item.character }}</td>
                                        <td>{{ props.item.sample }}</td>
                                    </template>
                                    <template v-slot:no-data>
                                        Aucune erreur trouvé dans ce fichier
                                    </template>
                                </v-data-table>
                            </v-card>

                            <v-card-actions>
                                <v-btn color="warning" @click="clear">Fichier suivant</v-btn>
                            </v-card-actions>
                        </v-stepper-content>
                        <!-- /Result -->
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </template>
    </base-tool>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

import { createNamespacedHelpers } from 'vuex'
import * as types from '../stores/types'

import BaseTool from '../components/BaseTool'

const { mapActions, mapState } = createNamespacedHelpers('user')

export default {
    mixins: [validationMixin],
    components: {
        'base-tool': BaseTool
    },
    data () {
        return {
            currentStep: 1,
            fileToVerify: null,
            isLoading: false,
            issues: null,
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Ligne', value: 'line' },
                { text: 'Caractère', value: 'character' },
                { text: 'Extrait', value: 'sample' }
            ]
        }
    },
    computed: {
        currentFileName () {
            return this.fileToVerify ? this.fileToVerify.name : 'Aucun fichier sélectionné'
        },
        isResponseValid () {
            return this.issues && Array.isArray(this.issues)
        },
        ...mapState({
            token: state => state.token
        })
    },
    methods: {
        changeFile (e) {
            const file = e.target.files[0]
            this.fileToVerify = file ? file : null

            if (file) {
                this.isLoading = true
                this.$makeAPI().checkCharacter(file)
                    .then(issues => {
                        this[types.ADD_FLASH_MESSAGE] ({
                            type: 'success',
                            message: 'Le traitement est fini'
                        })
                        this.issues = issues
                    })
                    .catch(e => {
                        console.log(e)
                        this[types.ADD_FLASH_MESSAGE] ({
                            type: 'error',
                            message: 'Une erreur est survenu'
                        })
                    })
                    .finally(() => {
                        this.isLoading = false
                    })
            }
        },
        clear() {
            this.currentStep = 1,
            this.fileToVerify = null
            this.isLoading = false
            this.issues = null
        },
        ...mapActions([
            types.ADD_FLASH_MESSAGE,
            types.SET_PAYLOAD
        ])
    },
    validations: {
        fileToVerify: {
            name: {}
        },
    },
    watch: {
        issues (v) {
            console.log('hello')
            if (v && Array.isArray(v)) {
                this.currentStep = 2
            } else {
                this.currentStep = 1
            }
        }
    }
}
</script>

<style>
    .hidden {
        display: none;
    }
</style>