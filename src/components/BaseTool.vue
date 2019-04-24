<template>
    <v-container>
        <slot name="modal"></slot>
        <!-- Headline -->
        <v-layout class="mb-4">
            <slot name="headline"></slot>
        </v-layout>
        <!-- /Headline -->

        <!-- Body -->
        <v-layout>
            <slot name="body"></slot>
        </v-layout>
        <!-- /Body -->
    </v-container>
</template>

<script>

export default {
    
}
</script>

<style>
    .hidden {
        display: none;
    }
</style>