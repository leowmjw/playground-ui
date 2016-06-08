<style>
    .table-babbage {
        overflow-x: scroll;
        min-height: 25em
    }

    .table-babbage::-webkit-scrollbar {
        -webkit-appearance: none
    }

    .table-babbage::-webkit-scrollbar:horizontal {
        height: 11px
    }

    .table-babbage::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: rgba(0, 0, 0, .5)
    }

    .table-babbage::-webkit-scrollbar-track {
        background-color: #fff;
        border-radius: 8px
    }

    .table-babbage .table {
        table-layout: fixed;
        width: inherit;
        min-width: 100%;
        border-collapse: collapse;
        margin-bottom: 0
    }

    .table-babbage .table td, .table-babbage .table th {
        min-width: 13em;
        max-width: 25em;
        overflow: hidden;
        white-space: nowrap
    }

    .table-babbage .table th {
        border-bottom: 1px solid #ddd;
        background-color: #f5f5f5
    }

    .table-babbage .table th.title {
        border-right: 0
    }

    .table-babbage .table th.operations {
        width: 1px;
        min-width: 1em;
        border-left: 0;
        text-align: right
    }

    .table-babbage .table td.simple {
        border-bottom: 0;
        border-top: 0
    }

    .table-babbage .table td.numeric {
        text-align: right
    }

    .table-babbage .table th .sublabel {
        font-weight: 400
    }

    .table.table-panel td.middle {
        vertical-align: middle
    }

    .table.table-panel tr.adjoined td, .table.table-panel tr.adjoined th {
        border-top: 0;
        padding-top: 0
    }

    .table.table-panel tbody {
        border-top: 0
    }

</style>

<template>

    <div class="table-babbage" v-show="tableData.columns.length">
        <table class="table table-bordered table-condensed">
            <thead>
            <tr v-for="header in tableData.headers">
                <th v-for="col in header">
                    {{ col }}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="rows in tableData.columns">
                <td v-for="dimension in rows.dimensions">
                    {{ dimension.nameValue }}
                </td>
                <td v-for="measure in rows.measures" class="numeric">
                    {{ formatMYR(measure.value) }}
                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="table-babbage" v-show="tableData.columns.length === undefined || tableData.columns.length === null">
        <div class="alert alert-info">
            <strong>You have not selected any data.</strong> Please choose a set of rows
            and columns to generate a cross-table.
        </div>
    </div>


</template>

<script>

    import util from 'util'
    // Actual Component Implementation
    import TableComponent from './components/table'

    export default {
        props: ['cube', 'endpoint'],
        components: {},
        data () {
            return {
                state: {
                    group: ["functional_classification_2.Item", "economic_classification_Level_2.Level_2_x_3"]
                },
                tableData: null
            }
        },
        watch: {},
        ready () {
            const endpoint = "http://next.openspending.org/api/3"
            // const cube = "boost:boost-moldova-2005-2014"
            const cube = "0638aadc448427e8b617257ad01cd38a:kpkt-propose-2016-hierarchy-test"
            const state = {
                // group: ["functional_classification_2.Item", "economic_classification_Level_2.Level_2_x_3"]
                // group: ["economic_classification_Level_2.Level_2_x_3", "functional_classification_2.Item"]
                // group: ["economic_classification_Level_2.Level_2_x_3"]
                group: ["functional_classification_2.Item"],
                order: [{key: "Amount.sum", direction: 'asc'}]
            }


            const babbageTable = new TableComponent()
            const p = new Promise(function (resolve, reject) {
                // DEBUG:
                // console.error("Calling ENDPOINT %s for CUBE %s with state %s", endpoint, cube, util.inspect(state))
                babbageTable.getTableData(endpoint, cube, state)
                        .then(resolve)
                        .catch(reject)
            })
            // Execute promise ..
            p.then(function (tableData) {
                        // DEBUG:
                        // console.error("RESULT: ", util.inspect(tableData, {depth: 10}))
                        this.tableData = tableData
                    }.bind(this)
            )
        },
        methods: {
            formatMYR: function (value) {
                return new Intl.NumberFormat().format(value)
            }
        },
        computed: {}
    }

</script>