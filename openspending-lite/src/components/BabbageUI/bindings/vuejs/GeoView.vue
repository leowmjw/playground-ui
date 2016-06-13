<style>
    .babbage-geoview-units path.selected, .babbage-geoview-units path:hover {
        stroke-width: 2px
    }

    .babbage-geoview-labels[hidden] {
        display: none
    }

    .babbage-geoview-legend i, .babbage-geoview-legend span {
        display: inline-block;
        vertical-align: middle
    }

    .babbage-geoview-labels text {
        font-weight: 300;
        text-anchor: middle;
        user-select: none;
        pointer-events: none
    }

    .babbage-geoview-infocard {
        right: 8px;
        top: 8px;
        border-radius: 3px;
        border: 1px solid #bbb
    }

    .babbage-geoview-legend {
        left: 8px;
        bottom: 8px;
        border-radius: 3px;
        border: 1px solid #bbb
    }

    .babbage-geoview-legend i {
        margin-right: .7em;
        width: 1em;
        height: 1em;
        border-radius: 50%
    }

    .geoview-container {
        display: block;
        position: relative;
        width: 100%
    }

    .geoview-container:before {
        content: "";
        display: block;
        width: 100%;
        padding-top: 60%
    }

    .geoview-container .babbage-geoview {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%
    }

    .babbage-geoview-infocard, .babbage-geoview-legend {
        position: absolute;
        padding: .5em 1em;
        background: #fcfcfc
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
                geo: {
                    group: ['location.title'],
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