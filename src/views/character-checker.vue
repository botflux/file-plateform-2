<template>
    <base-tool>
        <template v-slot:modal>
            <!-- Loader -->
            <modal-loader :is-loading="isLoading" />
            <!-- /Loader -->
        </template>
        <template v-slot:headline>
            <tool-header overline="Fichier" title="Vérification de caractère" description="At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio." />
        </template>

        <template v-slot:body>
            <v-flex>
                <v-stepper v-model="currentStep">
                    <v-stepper-header>
                        <v-stepper-step step="1" :complete="Boolean(fileToVerify)">
                            Renseigner votre fichier
                        </v-stepper-step>

                        <v-divider></v-divider>

                        <v-stepper-step step="2" :complete="isResponseValid">
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

                        <!-- Result -->
                        <v-stepper-content step="2">
                            <result :issues="issues" @nextFile="clear" v-if="isResponseValid" />
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
import Result from '../components/tool/character-checker/result'
import File from '../components/tool/character-checker/file'

const { mapActions } = createNamespacedHelpers('user')

export default {
  components: {
    'base-tool': BaseTool,
    'modal-loader': ModalLoader,
    'tool-header': ToolHeader,
    'file-input': FileInput,
    'result': Result,
    'file': File
  },
  data () {
    return {
      currentStep: 1,
      fileToVerify: null,
      isLoading: false,
      issues: null,
    }
  },
  computed: {
    isResponseValid () {
      return this.issues && Array.isArray(this.issues)
    },
  },
  methods: {
    clear () {
      this.currentStep = 1
      this.fileToVerify = null
      this.issues = null
    },
    ...mapActions([
      types.ADD_FLASH_MESSAGE,
    ])
  },
  watch: {
    issues (v) {
      if (v && Array.isArray(v)) {
        this.currentStep = 2
      } else {
        this.currentStep = 1
      }
    },
    fileToVerify (file) {
        if (file) {
            this.isLoading = true
            this.$makeAPI().checkCharacter(file)
                .then(issues => {
                    this[types.ADD_FLASH_MESSAGE]({
                        type: 'success',
                        message: 'Le traitement est fini'
                    })
                    this.issues = issues
                })
                .catch(e => {
                    console.log(e)
                    this[types.ADD_FLASH_MESSAGE]({
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

<style>
    .hidden {
        display: none;
    }
</style>
