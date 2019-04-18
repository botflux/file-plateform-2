<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <router-link to="/">File Plateform</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        :to="{ name: 'login' }"
      >
        <span class="mr-2">Connexion</span>
      </v-btn>
      <v-btn
        v-if="isAnon"
        flat
        :to="{ name: 'login' }"
      >
        <span class="mr-2">Connexion</span>
      </v-btn>
      <v-btn v-else flat @click="disconnectUser">
        <span class="mr-2">Deconnexion</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <router-view />
      <v-snackbar v-model="showCurrentMessage" :top="true" :color="currentMessage.type" :timeout="timeout">
        {{ currentMessage.message }}
        <v-btn
          flat
          @click="showCurrentMessage = false"
        >Fermer</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from './stores/types'
import Vue from 'vue'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers('user')

export default {
  name: 'App',
  mounted () {
  },
  data () {
    return {
      showCurrentMessage: false,
      currentMessage: {
        type: '',
        message: ''
      },
      timeout: 4000
    }
  },
  computed: {
    ...mapState({
      flashMessages: state => state.flashMessages,
      token: state => state.token
    }),
    ...mapGetters({
      isAnon: types.IS_ANON
    })
  },
  methods: {
    ...mapActions([
      types.REMOVE_FLASH_MESSAGE,
      types.DISCONNECT
    ]),
    notify(notification) {
      console.log('notify called')
      this.currentMessage = notification
      this.showCurrentMessage = true
    },
    async disconnectUser () {
      await this[types.DISCONNECT]()
      this.$router.push('/login')
    }
  },
  watch: {
    showCurrentMessage (n, o) {
      if (n == false && o == true) {
        this[types.REMOVE_FLASH_MESSAGE] (this.currentMessage)
      }
    },
    flashMessages (n) {
      if (this.showCurrentMessage == false && n.length > 0) {
        this.showCurrentMessage = false
        // console.log(this)
        Vue.nextTick()
          .then(() => this.notify(n[0]))
      }
    },
  },
}
</script>
