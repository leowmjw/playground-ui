<style>

</style>

<template>


</template>

<script>


    export default {
        props: ['cube', 'type', 'endpoint'],
        components: {},
        data () {
            return {
                Char: {
                    group: ['classification_economic_econ1_label.econ1_label'],
                    aggregates: 'adjusted.sum'
                },
                MultiChar: {
                    group: ['classification_economic_econ1_label.econ1_label'],
                    series: ['classification_administrative_admin1.admin1'],
                    aggregates: 'adjusted.sum'
                }
            }
        },
        watch: {},
        ready () {

        },
        computed: {}

    }

</script>