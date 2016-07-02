<style scoped>

    .x-visualization-add, .x-visualization-container.well {
        background: #fff;
        margin: .5em 0
    }

    .x-visualization-container.x-fixed-visualization .table-babbage {
        min-height: 0
    }

    /*
        .x-visualization-container > div {
            position: relative
        }

        .x-visualization-container .x-visualization-chart {
            position: relative;
            min-height: 150px
        }

        .x-visualization-container .x-visualization-info {
            display: none;
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: 990
        }

        .x-visualization-container .x-visualization-buttons {
            position: absolute;
            top: 0;
            right: 15px;
            white-space: nowrap;
            font-size: 200%;
            z-index: 999
        }

        .x-visualization-container .x-visualization-buttons a {
            color: silver;
            text-decoration: none
        }

        .x-visualization-container .x-visualization-buttons a:active, .x-visualization-container .x-visualization-buttons a:hover {
            color: #cdcdcd;
            text-decoration: none
        }

        */
</style>

<template>
    <!--

    <measures></measures>
    -->
    <div class="col-md-8 well x-visualization-container">
        <treemap
                :treemapid="packageid"
                :cube="cube"
                :endpoint="endpoint"
        ></treemap>
    </div>
    <div class="col-md-4 well x-visualization-container">
        <bubbletree
                :bubbletreeid="packageid"
                :cube="cube"
                :endpoint="endpoint"
        ></bubbletree>
    </div>
    <div class="col-md-12 well x-visualization-container">
        <pie
                :pieid="packageid"
                :cube="cube"
                :endpoint="endpoint"
        ></pie>
    </div>
</template>

<script>

    import util from 'util'
    // libs ..
    import Utils from './BabbagePackage/Utils'
    import Model from './BabbagePackage/Model'
    // Subcomponents inside ..
    import Measures from './fragments/Measures.vue'
    import TreeMap from './bindings/vuejs/TreeMap.vue'
    import BubbleTree from './bindings/vuejs/BubbleTree.vue'
    import Pie from './bindings/vuejs/Pie.vue'

    // NOTE: We will only support drilldown types
    // TreeMap + BubbleTree??
    // with links to get us elsewhere ... to OSNext ..

    export default {
        props: ['cube', 'endpoint', 'type', 'packageid', 'params'],
        components: {
            measures: Measures,
            treemap: TreeMap,
            bubbletree: BubbleTree,
            pie: Pie
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
                },
                initstate: {
                    aggregates: null,
                    group: null,
                    filter: [],
                    drillDown: null
                }
            }
        },
        watch: {},
        events: {
            'treemap-click': function (chosen_key) {
                console.error("TREEMAP-CLICK!!!")
                // Call the Drilldown method now ...
                // Extract out the key??
                this.drillDown(chosen_key)
            },
            'bubbletree-click': function (chosen_key) {
                console.error("BUBBLETREE-CLICK!!!")
                // Call the Drilldown method now ...
                // Should behavior be different when with BubbleTree vs TreeMap??
                this.drillDown(chosen_key)
            },
            'babbage-click': function (chosen_key) {
                console.error("BABBAGE-CLICK!!! KEY:", chosen_key)
                // Call the Drilldown method now ...
                // Should behavior be different when with BubbleTree vs TreeMap??
                this.drillDown(chosen_key)
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
                        // DEBUG:
                        // console.error("ALL:", util.inspect(values, {depth: 10}))
                        // this.babbage = values
                        // Attach to the items; use spread method ..
                        let [ hierarchies, measures, dimensions ]  =  values
                        // console.error("ORIG_HIERARCHIES:", util.inspect(Object.assign({}, hierarchies), {depth: 10}))
                        this.state.hierarchies.items = hierarchies
                        // console.error("HIERARCHIES:", util.inspect(this.state.hierarchies.items, {depth: 10}))
                        this.state.measures.items = measures
                        // console.error("MEASURES:", util.inspect(this.state.measures.items, {depth: 10}))
                        // this.state.dimensions.items = JSON.stringify(dimensions)
                        this.state.dimensions.items = dimensions
                        // console.error("DIMENSIONS:", util.inspect(this.state.dimensions.items, {depth: 10}))
                        /*
                         this.state.hierarchies.items = values[0]
                         this.state.measures.items = values[1]
                         this.state.dimensions.items = []
                         console.error("TYPE: %s STRUCT: %s", typeof(this.state.hierarchies.items), util.inspect(values, {depth:10}))
                         */
                        // [this.state.hierarchies.items, this.state.measures.items, this.state.dimensions.items] = values

                        // Must be within here; otherwise does not work in the right order!!
                        // NOTE: Above hack needed as not sure how to replace Object fully without inheriting the Observables!!
                        // NOTE to NOTE above: Getter/Setter is correctly meld on to it .. as an Observable; as long as we get data
                        //      to see structure; can use JSON.stringify ..
                        // Does it change?? probably related to the $set .. no clue :P
                        // console.error("HIERARCHIES:", util.inspect(JSON.parse(this.state.hierarchies.items), {depth: 10}))
                        // console.error("MEASURES:", util.inspect(JSON.parse(this.state.measures.items), {depth: 10}))
                        // console.error("DIMENSIONS:", util.inspect(JSON.parse(this.state.dimensions.items), {depth: 10}))
                        // If has initstate; do something about it .. merge via Object.assign??
                        // params below generated form URL?  filters === cut??
                        this.chooseStateParams(this.params)

                        // Set the currents; dupe here??

                        // Pass to the component; one time?
                    }.bind(this)
            ).catch(
                    function (err) {
                        console.error("ERR:", util.inspect(err))
                    }
            )


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
                    // Pick from the first item of hierarchies, measures, dimensions ..
                    const hierarchies = this.state.hierarchies.items
                    const measures = this.state.measures.items
                    // const dimensions = JSON.parse(this.state.dimensions.items)
                    const dimensions = this.state.dimensions.items

                    // Not needed ...
                    // this.initstate = Object.assign({}, {h: hierarchies, m: measures, d: dimensions})

                    // Select first item from hierarchies; pick it; pick the first item in its levels
                    // == save to ==> chosen_dimension
                    let chosen_hierarchy
                    for (let key of Object.keys(hierarchies)) {
                        // TODO: What is ES6 way to make this more robust when it does not fit the exception??
                        chosen_hierarchy = hierarchies[key].levels[0]
                        // console.log("Default Selection: ", util.inspect(chosen_dimension, {depth: 10}))
                        this.state.hierarchies.current = chosen_hierarchy
                        break
                    }

                    // Select first item from measures == save to ==> initstate.aggregates
                    this.state.measures.current = measures[0].key
                    this.initstate.aggregates = this.state.measures.current

                    // Select first item from dimensions with key <chosen_dimension> == save to ==> initstate.groups
                    for (let dimension of dimensions) {

                        // What is the key used to refer ==> ID .id
                        // DEBUG:
                        // console.log("DIM: %s STRUCT: %s", dimension.id, util.inspect(dimension, {depth: 10}))
                        // Pull out the drilldown too??
                        if (chosen_hierarchy == dimension.id) {
                            // Store for later reuse ..
                            this.state.dimensions.current.groups = dimension
                            // console.error("KEY: %s DRILLDOWN: %s", dimension.key, dimension.drillDown)
                            this.initstate.group = [dimension.key]
                            this.initstate.drillDown = dimension.drillDown
                            break
                        }

                    }

                    // What would be the default orderBy?? The first item??
                    // console.error("INIT_STATE: A: %s G: %s", util.inspect(this.initstate.aggregates), util.inspect(this.initstate.group))

                } else {
                    // set the current state using the passed defaultParams
                }
                // else Choose the defaults ..
                // Set the currents ..

                // OK; DEBUG: defaultinitSTate is
                // console.error("STATE:", util.inspect(this.state, {depth: 10}))
                // Finally
                this.updateBabbage()
                //   updateBabbage();
                // updateLocation();

            },
            drillDown: function (chosen_key) {
                // DEBUG:
                // console.error("drillDown on KEY: %s TO: %s", util.inspect(chosen_key), this.initstate.drillDown)
                // Optional; check if it is found in the original model structure

                // append value to the current dimension label; add to filter to cut

                // trigger refresh .. of state to pass into component; trigger watch changes??

                if (this.initstate.drillDown == undefined || this.initstate.drillDown == null) {
                    // Do nothing
                } else {
                    // ADDD to filter: current_level : chosen_key
                    // Change the group to drillDown; that will become the new current_level
                    let new_filter = `${this.initstate.group}:"${chosen_key}"`
                    // Append it into the filter array ..
                    this.initstate.filter.push(new_filter)

                    for (let dimension of this.state.dimensions.items) {
                        // DEBUG:
                        // console.error("Compare: %s to %s", this.initstate.drillDown, dimension.key)
                        // Look for the matching item; use KEY here instead of ID; may be confusing; better way to encapsulate??
                        if (this.initstate.drillDown == dimension.key) {
                            // Store for later reuse ..
                            this.state.dimensions.current.groups = dimension
                            console.error("KEY: %s DRILLDOWN: %s", dimension.key, dimension.drillDown)
                            this.initstate.group = [dimension.key]
                            this.initstate.drillDown = dimension.drillDown
                            break
                        }
                    }
                    // If want to be robust; make sure there is a new_filter??
                    console.log("NEW_FILTER: ", util.inspect(this.initstate.filter, {depth: 10}))
                    // refresh ...
                    this.updateBabbage()
                }

            },
            updateBabbage: function () {
                // call Utils.prepareBabbageParams; bind to current context state so we get the state we need
                // const new_initstate = Utils.prepareBabbageParams.call(this.state)
                this.$broadcast('update-babbage', this.initstate)
                // call updateBreadCrumbs
                // call refreshBabbageComponents

            },
            updateBreadCrumbs: function () {

            },
            refreshBabbageComponents: function () {
                // Maybe: http://stackoverflow.com/questions/34255351/is-there-a-version-of-settimeout-that-returns-an-es6-promise
                // why??
                // changes state.flag.renderingCharts
                // Promise within promise ??
                // Requeueing as per: http://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
            }

        },
        computed: {}

    }


</script>