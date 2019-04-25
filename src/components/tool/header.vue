<template>
    <v-flex>
        <v-card>
            <v-card-title>
                <div>
                    <span class="caption text-uppercase">{{ overline }}</span>
                    <h1 class="display-1">{{ title }}</h1>
                </div>
            </v-card-title>
            <v-card-text>{{ description }}</v-card-text>
        </v-card>
    </v-flex>
</template>

<script>
export default {
    props: {
        overline: {
            type: String,
            value: 'overline'
        }, 
        title: {
            type: String,
            value: 'Titre'
        }, 
        description: {
            type: String,
            value: 'A description'
        }
    }
}
</script>