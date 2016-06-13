<style>


</style>

<template>

    <measures></measures>

</template>

<script>

    import Measures from './fragments/Measures.vue'

    export default {
        props: ['cube', 'type', 'endpoint'],
        components: {
            measures: Measures
        },
        data () {
            return {
                state: {
                    current: null
                }
            }
        },
        watch: {},
        events: {
            'dispatch-from-parent': function () {
                console.error("GOT MESSAGE FROM PARENT!!")
                this.$broadcast('dispatch-from-parent')

            }
        },
        ready () {

        },
        computed: {}

    }


</script>