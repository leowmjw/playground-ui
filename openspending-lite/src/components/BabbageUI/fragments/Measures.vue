<style>


</style>

<template>

    <h3>I AM A MEASURE</h3>

</template>

<script>


    export default {
        props: ['cube', 'endpoint'],
        components: {},
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
                console.error("GOT MESSAGE FROM PARENT TOPBAR!!")

            }
        },
        ready () {

        },
        computed: {}

    }


</script>