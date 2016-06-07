<style>
    .treemap-chart {
        min-height: 500px;
        overflow: hidden
    }

    .treemap-chart .node {
        display: block;
        border: 0;
        color: #fff;
        overflow: hidden;
        position: absolute;
        outline: #fff solid 1px;
        font-size: .8em;
        text-indent: 2px;
        padding: 5px;
        box-sizing: border-box;
        z-index: 5;
        font-weight: 300;
        text-shadow: -2px -2px 13px rgba(150, 150, 150, .9)
    }

    .treemap-chart .amount {
        display: block;
        padding-bottom: .2em;
        font-size: 1.5em
    }

    .treemap-chart .node:hover {
        text-decoration: none
    }

</style>

<template>


</template>

<script>


    export default {
        props: ['cube', 'endpoint'],
        components: {},
        data () {
            return {
                Char: {
                    group: ['classification_economic_econ1_label.econ1_label'],
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