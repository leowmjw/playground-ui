<style scoped>

    .alert-babbage {
        overflow-x: scroll;
        min-height: 25em
    }

    .alert-babbage::-webkit-scrollbar {
        -webkit-appearance: none
    }

    .alert-babbage::-webkit-scrollbar:horizontal {
        height: 11px
    }

    .alert-babbage::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: rgba(0, 0, 0, .5)
    }

    .alert-babbage::-webkit-scrollbar-track {
        background-color: #fff;
        border-radius: 8px
    }

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

    .ng-link {
        cursor: pointer
    }

    .ng-icon, .ng-icon:hover {
        text-decoration: none !important
    }


</style>

<template>

    <div>
        <h2>{{ cube }}, {{ apiUrl }}</h2>
        <babbage_package
                packageid="kpkt"
                :cube="cube"
                :endpoint="apiUrl"
                type="drilldown">
        </babbage_package>
    </div>
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
        <treemap
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
                treemapid="kpkt"
        ></treemap>

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

        <facts
                cube="{{cube}}"
                endpoint="{{apiUrl}}"
        ></facts>

                <sankey
                        cube="{{cube}}"
                        endpoint="{{apiUrl}}"
                        sankeyid="kpkt"
                ></sankey>
                -->

    </div>
</template>

<script>

    import BabbageTable from './BabbageUI/bindings/vuejs/Table.vue'
    import SanKey from './BabbageUI/bindings/vuejs/SanKey.vue'
    import TreeMap from './BabbageUI/bindings/vuejs/TreeMap.vue'
    import Facts from './BabbageUI/bindings/vuejs/Facts.vue'
    import BabbagePackage from './BabbageUI/BabbagePackage.vue'

    export default {
        props: [],
        components: {
            babbage_table: BabbageTable,
            sankey: SanKey,
            treemap: TreeMap,
            facts: Facts,
            babbage_package: BabbagePackage
        },
        data () {
            return {
                show: null,
                cube: "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test",
                apiUrl: "http://next.openspending.org/api/3",
                state: {
                    // Below for babbageParams??
                    babbage: null,
                    selectedVisualizations: null,
                    dimensions: {
                        current: {
                            columns: null,
                            filters: null,
                            groups: null,
                            row: null,
                            series: null
                        },
                        items: null
                    },
                    measures: {
                        current: null,
                        items: null
                    },
                    orderBy: null
                }
            }
        },
        watch: {
            'state.selectedVisualizations': {
                handler: function (val, oldVal) { /* ... */
                },
                deep: true
            },
            'state.dimensions.current.groups': function (val) {

            },
            'state.measures.current': function (val) {

            }
        },
        events: {
            'ping-parent': function () {
                console.error("PING-PARENT!!!")
                this.$broadcast('dispatch-from-parent', 'hi!!')
            },
            'bubbletree-click': function () {
                console.error("BUBBLETREE-CLICK!!")
            },
            'treemap-click': function () {
                console.error("TREEMAP-CLICK!!!")
            },
            clickBreadcrumb: function (breadcrumb) {

            },
            changePackage: function (searchPackage, packageInfo) {

            },
            changeMeasure: function (measure) {

            },
            findDimension: function (key) {
                // Could be method / util

            },
            getFilters: function () {
                // Could be method / util

            },
            toggleOrderBy: function (key, direction, updateViews) {
                // Could be method / util

            },
            isGroupSelected: function (key) {

            },
            isFilterSelected: function (key) {

            },
            getSelectedValue: function (dimension) {

            },
            changeGroup: function (group, dropFilters) {

            },
            changeFilter: function (filter, value) {

            },
            dropFilter: function (filter) {

            },
            dropAllFilters: function () {

            },
            changePivot: function (axis, dimension, replace) {

            },
            dropPivot: function (axis, dimension, clear) {

            },
            canBack: function () {

            },
            canForward: function () {

            },
            back: function () {

            },
            forward: function () {

            },
            '$locationChangeSuccess': function () {
                // What is this?? UNKNOWN
            }
        },
        ready () {
        },
        methods: {
            selectDemo: function () {

            },
            updateBabbage: function () {
                // call Utils.prepareBabbageParams
                // call updateBreadCrumbs
                // call refreshBabbageComponents

            },
            changePackage: function (searchPackage, defaultParams) {

            },
            chooseStateParams: function (defaultParams) {

            },
            setState: function (state) {

            },
            refreshBabbageComponents: function () {
                // Maybe: http://stackoverflow.com/questions/34255351/is-there-a-version-of-settimeout-that-returns-an-es6-promise
                // why??
                // changes state.flag.renderingCharts
                // Promise within promise ??
                // Requeueing as per: http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
            },
            drillDown: function (value) {

            },
            lazyLoadDimensionValues: function (dimension) {

            },
            lazyLoadManyDimensionValues: function (dimension) {

            },
            updateBreadCrumbs: function () {

            }
        },
        computed: {}

    }

</script>