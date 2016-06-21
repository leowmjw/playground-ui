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
        props: ['cube', 'endpoint', 'type', 'packageid', 'initstate', 'params'],
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
                    hierarchies: {
                        current: null,
                        items: null
                    },
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
            // Return the Hierarchy Available with Labels; and the Top Level Reference
            // along with all the Dimensions with their Drill Down ..
            /*
             {
             hierarchies: <All Hierarchies with Keys>
             measures: ..
             dimensions: <ALL Dimensions with DrillDowns>
             }
             */
            // console.error("ready: cube: %s endpoint: %s type: %s", this.cube, this.endpoint, this.type)
            // Atatch it to babbage; which is a prepped representative of its overall mapping ??
            const mypro = Model.buildState({cube: this.cube, endpoint: this.endpoint}, {})

            const o = Promise.all(mypro)
            o.then(
                    function (values) {
                        console.error("ALL:", util.inspect(values, {depth: 10}))
                        // this.babbage = values
                    }
            ).catch(
                    function (err) {
                        console.error("ERR:", util.inspect(err))
                    }
            )

            // If has initstate; do something about it .. merge via Object.assign??
            // params below generated form URL?  filters === cut??
            this.chooseStateParams(this.params)

            // Set the currents; dupe here??

            // Pass to the component; one time?

        },
        methods: {
            changeVisualization: function () {
                Utils.prepareBabbageParams()
                // Change the v-if
                // and render the items? with the right template and right props
            },
            chooseStateParams: function (defaultParams) {
                // if have defaultParams; extract those and set in the DATA set
                if (defaultParams == null || defaultParams == undefined) {
                    // Nothign passed; so that the babage overall and select

                } else {
                    // set the current state using the passed defaultParams
                }
                // else Choose the defaults ..
                // Set the currents ..

                // Finally
                //           updateBabbage();
                // updateLocation();

            },
            drillDown: function (value) {

                // Optional; check if it is found in the original model structure

                // append value to the current dimension label; add to filter to cut

                // trigger refresh .. of state to pass into component; trigger watch changes??

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