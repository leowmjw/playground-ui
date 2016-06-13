<style scoped>

    .sankey-babbage .node rect {
        shape-rendering: crispEdges;
        stroke-width: 2px;
        stroke: #fff
    }

    .sankey-babbage .node text {
        pointer-events: none;
        text-shadow: 0 1px 0 #fff;
        font-family: inherit
    }

    .sankey-babbage .link {
        fill: none;
        stroke: #000;
        stroke-opacity: .1
    }

    .sankey-babbage .link:hover {
        stroke-opacity: .5
    }

</style>

<template>
    <div>

        <div class="alert-babbage">
            <div class="alert alert-info">
                <strong>You have not selected any data.</strong> Please choose the
                configuration for your chart.
            </div>
        </div>

        <div class="alert alert-warning">
            <strong>Too many categories.</strong> There are more than ((XXX CUTOFF)) items
            in the selected drilldown.
        </div>

        <div id="sankey-{{ sankeyid }}" class="sankey-chart"></div>

    </div>

</template>

<script>
    import util from 'util'
    // Get the actual component implementation ..
    import SanKeyChartComponent from '../../components/sankey'

    export default {
        props: ['cube', 'endpoint', 'sankeyid'],
        components: {},
        data () {
            return {
                state: {
                    group: ['classification_economic_econ1_label.econ1_label'],
                    aggregates: 'adjusted.sum'
                }
            }
        },
        watch: {},
        ready () {
            const endpoint = "http://next.openspending.org/api/3"
            // const cube = "boost:boost-moldova-2005-2014"
            const cube = "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test"
            const state = {
                // Aggregates? REQUIRED!!!!
                aggregates: "Amount.sum",
                source: "functional_classification_2.Item",
                target: "economic_classification_Level_2.Level_2_x_3",

                // group is calculated automatically; so no point specifying
                //     params.group = [params.source, params.target];

                // group: ["functional_classification_2.Item", "economic_classification_Level_2.Level_2_x_3"]
                // group: ["economic_classification_Level_2.Level_2_x_3", "functional_classification_2.Item"]
                // group: ["economic_classification_Level_2.Level_2_x_3"]
                // group: ["functional_classification_2.Item"],

                // If Order not defined; then combo like below
                //        {key: params.aggregates, direction: 'desc'},
                //        {key: params.source, direction: 'asc'},
                //        {key: params.target, direction: 'asc'}
                // order: [{key: "Amount.sum", direction: 'asc'}]
            }

            const sanKeyChart = new SanKeyChartComponent()
            const wrapper = document.querySelector("div#sankey-kpkt")
            console.error(util.inspect(sanKeyChart))
            sanKeyChart.build(endpoint, cube, state, wrapper)

        },
        methods: {},
        computed: {}

    }

</script>