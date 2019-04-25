<template>
    <div>
        <input type="file" @change="changeFile($event)" class="hidden" ref="fileInput" />
        <v-btn color="primary" @click="$refs.fileInput.click()">Choisissez un fichier</v-btn>
        <span class="caption">{{ currentFilename }}</span>
    </div>
</template>

<script>
export default {
    methods: {
        changeFile (e) {
            this.$emit('input', e.target.files[0])
        }
    },
    props: {
        value: {
            type: File,
            value: null
        }, 
        noFileMessage: {
            type: String,
            value: 'Aucun fichier sélectionné'
        },
    },
    computed: {
        currentFilename () {
            return this.file ? this.file.name : this.noFileMessage
        },
        file () {
            return this.value
        }
    }
}
</script>

<style scoped>
    .hidden {
        display: none;
    }
</style>