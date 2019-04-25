<template>
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
</template>

<script>
export default {
    props: {
        isLoading: {
            type: Boolean,
            value: false
        }
    }
}
</script>