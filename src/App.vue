<template>
  <v-app>
    <v-navigation-drawer app v-model="isDrawerActive" temporary>
      <v-list class="pa-1">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ isAnon ? `Vous n'êtes pas connecté` : user.email }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="link in links"
          :key="link.title"
          @click="dismissDrawer"
          :to="link.to"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
    <v-toolbar-side-icon @click="isDrawerActive = !isDrawerActive"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>File Plateform</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
      timeout: 4000,
      isDrawerActive: false,
      links: [
        { icon: 'home', title: 'Accueil', to: { name: 'home' } },
        { icon: 'spellcheck', title: 'Vérifier caractères', to: { name: 'character-checker' } },
        { icon: 'transform', title: 'Transformer des données', to: { name: 'home' } }
      ]
    }
  },
  computed: {
    ...mapState({
      flashMessages: state => state.flashMessages,
      token: state => state.token,
      user: state => state.payload
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
    },
    dismissDrawer () {
      this.isDrawerActive = !this.isDrawerActive
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
