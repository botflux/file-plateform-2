<template>
    <base-tool>
        <template v-slot:modal>
            <!-- Loader -->
            <modal-loader :is-loading="isLoading" />
            <!-- /Loader -->
        </template>
        <template v-slot:headline>
            <tool-header overline="CSV" title="Véirification de nom de ville" description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio." />
        </template>

        <template v-slot:body>
            <v-flex>
                <v-stepper v-model="currentStep">
                    <v-stepper-header>
                        <v-stepper-step step="1" :complete="Boolean(fileToVerify)">
                            Renseigner votre fichier
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="2" :complete="fileHeadersAreValid && choosenHeaders.length > 0">
                            Sélectionner les colonnes
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="3" :complete="issuesAreValid">
                            Résultat
                        </v-stepper-step>

                    </v-stepper-header>

                    <v-stepper-items>
                        <!--  File -->
                        <v-stepper-content step="1">
                            <file>
                                <file-input v-model="fileToVerify" />
                            </file>
                        </v-stepper-content>
                        <!-- /File -->

                        <!-- Headers -->
                        <v-stepper-content step="2">
                            <v-card>
                                <v-card-title>Sélectionner les colonnes</v-card-title>
                                <v-item-group v-if="fileHeadersAreValid" v-model="choosenHeaders" multiple>
                                    <v-item v-for="(header, i) in fileHeaders" :key="i">
                                        <v-chip
                                            slot-scope="{ active, toggle }"
                                            
                                            @click="toggle"
                                            :selected="active"
                                            :color="active ? 'primary': ''"
                                            :class="{ 'white--text': active }"
                                        >
                                            {{ header }}
                                        </v-chip>
                                    </v-item>
                                </v-item-group>
                                <v-card-actions>
                                    <v-btn :disabled="!(fileHeadersAreValid && choosenHeaders.length > 0)" color="primary" @click="submitHeaders">
                                        Continuer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-stepper-content>
                        <!-- /Headers -->

                        <!-- Result -->
                        <v-stepper-content step="3">
                            <result :issues="issues" v-if="issuesAreValid" @nextFile="clear" />
                        </v-stepper-content>
                        <!-- /Result -->
                    </v-stepper-items>
                </v-stepper>
            </v-flex>
        </template>
    </base-tool>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '../stores/types'

import BaseTool from '../components/BaseTool'
import ModalLoader from '../components/loader/modal-loader'
import ToolHeader from '../components/tool/header'
import FileInput from '../components/form/file-input'
import File from '../components/tool/character-checker/file'
import Result from '../components/tool/cities/result'

const { mapActions } = createNamespacedHelpers('user')

export default {
  components: {
    'base-tool': BaseTool,
    'modal-loader': ModalLoader,
    'tool-header': ToolHeader,
    'file-input': FileInput,
    'file': File,
    'result': Result
  },
  data () {
      return {
          isLoading: false,
          fileToVerify: null,
          fileHeaders: null,
          issues: null,
          choosenHeaders: [],
          currentStep: 1
      }
  },
  methods: {
    ...mapActions([
        types.ADD_FLASH_MESSAGE
    ]),
    clear () {
        this.fileToVerify = null
        this.fileHeaders = null
        this.issues = null
        this.choosenHeaders = []
        this.currentStep = 1
    },
    submitHeaders () {
        if (this.fileToVerify && this.fileHeadersAreValid) {
            console.log('heeee')
            this.isLoading = true
            this.$makeAPI().citiesExist (this.fileToVerify, this.choosenHeaders.map(index => this.fileHeaders[index]))
                .then(issues => {
                    this[types.ADD_FLASH_MESSAGE] ({
                        type: 'success',
                        message: 'Le fichier a été analysé'
                    })
                    console.log(issues)

                    this.issues = issues
                    this.currentStep = 3
                })
                .catch(e => {
                    console.log(e.message)
                    this[types.ADD_FLASH_MESSAGE] ({
                        type: 'error',
                        message: 'Une erreur est survenue'
                    })
                })
                .finally(() => {
                    this.isLoading = false
                })
        } else {
            
            console.log('nheeee')
        }
    }
  },
  computed: {
    fileHeadersAreValid () {
        return this.fileHeaders && Array.isArray(this.fileHeaders)
    },
    issuesAreValid () {
        return this.issues && Array.isArray(this.issues)
    },
  },
  watch: {
    fileToVerify (file) {
        if (file) {
            this.isLoading = true
            this.$makeAPI().readHeaders (file)
                .then(headers => {
                    this[types.ADD_FLASH_MESSAGE] ({
                        type: 'success',
                        message: 'En-têtes trouvées'
                    })
                    this.fileHeaders = headers
                    this.currentStep = 2
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
    }
  }
}
</script>
