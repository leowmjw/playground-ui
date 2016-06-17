<style>


</style>

<template>

    <measures></measures>

</template>

<script>

    import util from 'util'
    // libs ..
    import Utils from './BabbagePackage/Utils'
    import Model from './BabbagePackage/Model'
    // Subcomponents inside ..
    import Measures from './fragments/Measures.vue'

    // NOTE: We will only support drilldown types
    // TreeMap + BubbleTree??
    // with links to get us elsewhere ... to OSNext ..

    export default {
        props: ['cube', 'endpoint', 'type', 'packageid', 'initstate'],
        components: {
            measures: Measures
        },
        data () {
            return {
                state: {
                    // Below for babbageParams??
                    babbage: null,
                    flag: null,
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
                    filters: null,
                    orderBy: null
                }
            }
        },
        watch: {},
        events: {
            'treemap-click': function () {
                console.error("TREEMAP-CLICK!!!")
                // Call the Drilldown method now ...
                // Extract out the key??
                this.drillDown("")
            },
            'dispatch-from-parent': function (msg) {
                console.error("GOT MESSAGE FROM PARENT!!", msg)
                this.$broadcast('dispatch-from-parent')

            }
        },
        ready () {
            // Form the hierarchy here ....

            // Start with packageid
            // If not valid; do something?? simeple validation ...
            // NOTE: packageid === cube!! See Table COmponet ..
            // Should there be a default cube?
            // Maybe at the higher level; BabbageUI based on the authority/org??

            Model.buildState(this.cube, {})

            // If has initstate; do something about it .. merge via Object.assign??
            // params below generated form URL?  filters === cut??
            this.chooseStateParams({})

            // Set the currents; dupe here??

        },
        methods: {
            changeVisualization: function() {
                Utils.prepareBabbageParams()
                // Change the v-if
                // and render the items? with the right template and right props
            },
            chooseStateParams: function (defaultParams) {
                // Choose the defaults ..
                // Set the currents ..

                // Finally
                //           updateBabbage();
                // updateLocation();

            },
            drillDown: function (value) {

            },
            refreshBabbageComponents: function () {
                // Maybe: http://stackoverflow.com/questions/34255351/is-there-a-version-of-settimeout-that-returns-an-es6-promise
                // why??
                // changes state.flag.renderingCharts
                // Promise within promise ??
                // Requeueing as per: http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
            },
            updateBabbage: function () {
                // call Utils.prepareBabbageParams
                // call updateBreadCrumbs
                // call refreshBabbageComponents

            },
            updateBreadCrumbs: function () {

            }

        },
        computed: {}

    }


</script>