<template>
    <v-card>
        <v-card-title>
            <h2>Résultat</h2>
        </v-card-title>

        <v-data-table :headers="headers" :items="issues">
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

        <v-card-actions>
            <v-btn color="warning" @click="nextFile">Fichier suivant</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        issues: {
            type: Array
        },
    },
    data () {
        return {      
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Ligne', value: 'line' },
                { text: 'Caractère', value: 'character' },
                { text: 'Extrait', value: 'sample' }
            ]
        }
    },
    methods: {
        nextFile () {
            this.$emit('nextFile')
        }
    }
}
</script>