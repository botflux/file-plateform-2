<template>
    <v-card>
        <v-card-title>
            <h2>Résultat</h2>
        </v-card-title>

        <v-data-table :headers="headers" :items="issues">
            <template v-slot:items="props">
                <td>{{ props.item.line }}</td>
                <td>{{ props.item.name }}</td>
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.message }}</td>
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
                { text: 'Ligne', value: 'line' },
                { text: 'Nom', value: 'name' },
                { text: 'Type', value: 'type' },
                { text: 'Message', value: 'message' }
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