<style>
    .bubbletree, .bubbletree .bubbletree-label2 span {
        background: #fff
    }

    .bubbletree-wrapper {
        width: 100%;
        height: 100%;
        position: absolute
    }

    .bubbletree {
        position: relative;
        height: 100%;
        overflow: hidden
    }

    .bubbletree .bubbletree-label {
        position: absolute;
        color: #fff;
        text-align: center;
        cursor: default
    }

    .bubbletree .bubbletree-amount {
        font-family: Graublau, Georgia, sans-serif;
        font-size: 16px
    }

    .bubbletree .bubbletree-desc, .bubbletree .bubbletree-label2 {
        font-size: 11px;
        font-family: sans-serif
    }

    .bubbletree .bubbletree-label2 {
        position: absolute;
        color: #000;
        text-align: center;
        cursor: default;
        margin-top: 5px
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