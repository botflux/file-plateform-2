<template>
  <v-container>
    <v-layout wrap>
      <v-flex xs12 md6 lg4 v-for="tool, i in tools" px-2 :key="i">
        <v-card>
          <v-card-title primary-title>
            <div>
              <span class="headline">{{ tool.title }}</span>
            </div>
          </v-card-title>
          <v-card-text>
              {{ tool.description }}
          </v-card-text>

          <v-card-actions>
            <v-btn flat :to="tool.to" color="primary">Accèder</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        tools: [
          { 
            title: 'Vérification de caractères',
            description: `Vérifiez que les fichiers encodés avec ISO 8859-1 (latin1) ne possède pas de caractère non inclus dans l'encodage.`,
            to: {
              name: 'home'
            } 
          }, { 
            title: 'Vérification de caractères',
            description: `Vérifiez que les fichiers encodés avec ISO 8859-1 (latin1) ne possède pas de caractère non inclus dans l'encodage.`,
            to: {
              name: 'home'
            } 
          }, { 
            title: 'Vérification de caractères',
            description: `Vérifiez que les fichiers encodés avec ISO 8859-1 (latin1) ne possède pas de caractère non inclus dans l'encodage.`,
            to: {
              name: 'home'
            } 
          }
        ]
      }
    }
  }
</script>
