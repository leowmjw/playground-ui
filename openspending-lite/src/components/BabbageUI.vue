<style>
    .c3 svg {
        font: 10px sans-serif;
        -webkit-tap-highlight-color: transparent
    }

    .c3 line, .c3 path {
        fill: none;
        stroke: #000
    }

    .c3 text {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }

    .c3-bars path, .c3-event-rect, .c3-legend-item-tile, .c3-xgrid-focus, .c3-ygrid {
        shape-rendering: crispEdges
    }

    .c3-chart-arc path {
        stroke: #fff
    }

    .c3-chart-arc text {
        fill: #fff;
        font-size: 13px
    }

    .c3-grid line {
        stroke: #aaa
    }

    .c3-grid text {
        fill: #aaa
    }

    .c3-xgrid, .c3-ygrid {
        stroke-dasharray: 3 3
    }

    .c3-text.c3-empty {
        fill: gray;
        font-size: 2em
    }

    .c3-line {
        stroke-width: 1px
    }

    .c3-circle._expanded_ {
        stroke-width: 1px;
        stroke: #fff
    }

    .c3-selected-circle {
        fill: #fff;
        stroke-width: 2px
    }

    .c3-bar {
        stroke-width: 0
    }

    .c3-bar._expanded_ {
        fill-opacity: .75
    }

    .c3-target.c3-focused {
        opacity: 1
    }

    .c3-target.c3-focused path.c3-line, .c3-target.c3-focused path.c3-step {
        stroke-width: 2px
    }

    .c3-target.c3-defocused {
        opacity: .3 !important
    }

    .c3-region {
        fill: #4682b4;
        fill-opacity: .1
    }

    .c3-brush .extent {
        fill-opacity: .1
    }

    .c3-legend-item {
        font-size: 12px
    }

    .c3-legend-item-hidden {
        opacity: .15
    }

    .c3-legend-background {
        opacity: .75;
        fill: #fff;
        stroke: #d3d3d3;
        stroke-width: 1
    }

    .c3-title {
        font: 14px sans-serif
    }

    .c3-tooltip-container {
        z-index: 10
    }

    .c3-tooltip {
        border-collapse: collapse;
        border-spacing: 0;
        background-color: #fff;
        empty-cells: show;
        box-shadow: 7px 7px 12px -9px #777;
        opacity: .9
    }

    .c3-tooltip tr {
        border: 1px solid #CCC
    }

    .c3-tooltip th {
        background-color: #aaa;
        font-size: 14px;
        padding: 2px 5px;
        text-align: left;
        color: #FFF
    }

    .c3-tooltip td {
        font-size: 13px;
        padding: 3px 6px;
        background-color: #fff;
        border-left: 1px dotted #999
    }

    .c3-tooltip td > span {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 6px
    }

    .c3-tooltip td.value {
        text-align: right
    }

    .c3-area {
        stroke-width: 0;
        opacity: .2
    }

    .c3-chart-arcs-title {
        dominant-baseline: middle;
        font-size: 1.3em
    }

    .c3-chart-arcs .c3-chart-arcs-background {
        fill: #e0e0e0;
        stroke: none
    }

    .c3-chart-arcs .c3-chart-arcs-gauge-unit {
        fill: #000;
        font-size: 16px
    }

    .c3-chart-arcs .c3-chart-arcs-gauge-max, .c3-chart-arcs .c3-chart-arcs-gauge-min {
        fill: #777
    }

    .c3-chart-arc .c3-gauge-value {
        fill: #000
    }

    .loading {
        z-index: 1000;
        position: absolute;
        width: 700px;
        height: 400px
    }

    .spaced {
        margin-bottom: 20px
    }

</style>

<template>

    <div>
        <!--
        <pie-chart
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></pie-chart>

        <chart
                cube="{{cube}}"
                type="bar"
                endpoint="{{apiUrl}}"
        ></chart>


        <chart
                cube="{{cube}}"
                type="line"
                endpoint="{{apiUrl}}"
        ></chart>

        <chart
                cube="{{cube}}"
                type="bar"
                endpoint="{{apiUrl}}"
        ></chart>

        <chart
                cube="{{cube}}"
                type="line"
                endpoint="{{apiUrl}}"
        ></chart>

        <tree-map
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></tree-map>

        <bubbletree
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></bubbletree>

        <geo-view
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></geo-view>

        <babbage-table
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></babbage-table>

        <pivot-table
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></pivot-table>
        -->

        <facts
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></facts>

    </div>
</template>

<script>


    export default {
        props: [],
        components: {},
        data () {
            return {
                cube: "boost:boost-moldova-2005-2014",
                apiUrl: "http://next.openspending.org/api/3",
                Char: {
                    group: ['classification_economic_econ1_label.econ1_label'],
                    aggregates: 'adjusted.sum'
                },
                MultiChar: {
                    group: ['classification_economic_econ1_label.econ1_label'],
                    series: ['classification_administrative_admin1.admin1'],
                    aggregates: 'adjusted.sum'
                },
                Pivot: {
                    cols: ['administrative_classification_admin1.admin1', 'other_exp_type.exp_type'],
                    rows: ['classification_economic_econ1_label.econ1_label', 'other_fin_source.fin_source'],
                    aggregates: 'adjusted.sum'
                },
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