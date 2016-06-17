<style>

</style>

<template>

    <div class="table-babbage" v-show="tableData.columns.length">
        <table class="table table-bordered table-condensed">
            <thead>
            <tr>
                <template v-for="header in tableData.headers">
                    <th class="title">
                        {{ header.label }}
                    </th>
                    <th class="operations">
                        <span v-if="getSort(header.key).direction" class="ng-link" @click="executeSort(header.key)">
                            <i class="fa"
                               :class="{
                                    fa-sort-desc: getSort(header.key).direction == 'desc',
                                    fa-sort-asc: getSort(header.key).direction == 'asc'
                               }"></i>
                        </span>
                        <span v-else @click="executeSort(header.key)">
                            <i class="fa fa-sort">x</i>
                        </span>
                    </th>
                </template>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rows in tableData.columns">
                <td v-for="row in rows track by $index" colspan="2"
                    :class="{'numeric': tableData.headers[$index].numeric}">
                <span v-if="tableData.headers[$index].numeric">
                    {{ row | formatMYR }}
                </span>
                <span v-else>
                    {{ row }}
                </span>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="pager">
            <ul v-show="showPager" class="pagination pagination-sm">
                <li :class="{'disabled': !hasPrev}">
                    <a class="ng-link" @click="setPage(current - 1)">&laquo;</a>
                </li>
                <li v-for="page in pages" :class="{'active': page.current}">
                    <a class="ng-link" @click="setPage(page.page)">{{page.page + 1}}</a>
                </li>
                <li :class="{'disabled': !hasNext}">
                    <a class="ng-link" @click="setPage(current + 1)">&raquo;</a>
                </li>
            </ul>
        </div>
    </div>

    <div class="alert-babbage">
        <div class="alert alert-info">
            <strong>You have not selected any data.</strong> Please choose a set of rows
            and columns to generate a cross-table.
        </div>
    </div>


    <button @click="this.$dispatch('ping-parent')">Send To BabbageUI</button>

</template>

<script>

    import util from 'util'
    // Actual Component
    import FactsComponent from '../../components/facts'

    export default {
        props: ['cube', 'endpoint'],
        components: {},
        data () {
            return {
                current: null,
                num: null,
                hasPrev: null,
                hasNext: null,
                showPager: null,
                pages: null,
                tableData: null,
                facts: null,
                state: {
                    group: null,
                    order: {
                        key: null,
                        direction: null
                    },
                    page: null
                },
                header: {
                    key: null,
                    label: null
                }
            }
        },
        watch: {},
        events: {
            'dispatch-from-parent': function () {
                console.error("CHILD FACTS GOT IT!!")

            }
        },
        ready () {
            // For Demo only; to be removed? centralized??
            // Or maybe check if nothing passed; sensible default??
            this.endpoint = "http://next.openspending.org/api/3"
            this.cube = "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test"
            this.state = {
                // Are any of these needed??
                aggregates: "Amount.sum",
                // Top Level
                // group: ["economic_classification_Top_x.Top_Level_x_1"],
                // group: ["functional_classification_2.Item"],
                // If order is missing; is it ok??
                //        {key: params.aggregates, direction: 'desc'},
                //        {key: params.source, direction: 'asc'},
                //        {key: params.target, direction: 'asc'}
                // order: [{key: "Amount.sum", direction: 'asc'}]
            }
            // TODO: Test below in next iteration
            this.facts = new FactsComponent()
            this.update()
        },
        methods: {
            formatMYR: function (value) {
                return new Intl.NumberFormat().format(value)
            },
            update: function () {
                const p = new Promise(
                        function (resolve, reject) {
                            this.facts.getTableData(this.endpoint, this.cube, this.state)
                                    .then(resolve)
                                    .catch(reject)
                        }.bind(this)
                ).then(function (tableData) {
                            console.error("DATA:", util.inspect(tableData, {depth: 10}))
                            // Strating state calculations
                            this.tableData = tableData
                            this.current = parseInt(tableData.info.page - 1, 10) || 0
                            this.num = Math.ceil(tableData.info.total / tableData.info.pageSize)
                            // Init
                            const pages = []
                            const num = this.num
                            const range = 3

                            // Figure out teh raneg ..
                            let low = this.current - range;
                            let high = this.current + range;

                            if (low < 0) {
                                low = 0
                                high = Math.min((2 * range) + 1, num)
                            }

                            if (high > num) {
                                high = num
                                low = Math.max(1, num - (2 * range) + 1)
                            }

                            // Won;t scale if have a huge number of result pages; looks
                            // like everything is loaded into memory before being iterated upon ..
                            for (let page = low; page <= high; page++) {
                                pages.push({
                                    page: page,
                                    current: page == this.current
                                })
                            }
                            this.hasPrev = this.current > 0
                            this.hasNext = this.current < num
                            this.showPager = num > 1
                            this.pages = pages
                        }.bind(this)
                )
            },
            hasSort: function (field) {
                // If not; UI will have deffault behavioor
            },
            executeSort: function (field) {
                // set the sort directinon
                // assumes has direction??
                console.error("SORTING: ", field)
            },
            getSort: function (field) {
                //               return _.find($scope.state.order, {key: field});
                // TODO: How to port above to ES6??
                const result = state.order.find(function (element, index, array) {
                    // {key: field}
                    console.error("EL: %s F: %s", util.inspect(element), field)
                })
                // Hard code it to unsorted for now ..
                return null

            },
            setSort: function (key, direction) {
                this.state.order = [{key: key, direction: direction}]
                // update();

            },
            setPage: function (page) {
                if (page >= 0 && page <= this.num) {
                    this.state.page = page + 1;
                    // update();
                }
            }
        },
        computed: {}

    }

</script>