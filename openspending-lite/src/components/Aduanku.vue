<style>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {
        border: 4px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
    }

    th {
        background-color: #42b983;
        color: rgba(255, 255, 255, 0.66);
        cursor: pointer;
        -user-select: none;
    }

    td {
        background-color: #f9f9f9;
        white-space: pre-line;
        border: 1px solid #42b983;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }

    #search {
        margin-bottom: 10px;
    }

    div.metadata {
        font-size: 10px;

    }

</style>

<template>
    <div class="col-md-6 portfolio-item">
        <!-- Drop down of Authority to select -->
        <!-- For now just list down the important ones .. -->
        <select v-model="current_topic">
            <option value="" selected="selected">Choose Focus Topic</option>
            <option value="health"></option>
            <option value="safety"></option>
        </select>
        <template v-if="current_topic">
            <h3>Selected Topic {{ current_topic }}</h3>
            <h4>Selected Coordinate: {{ selected_latlng }}</h4>
        </template>
        <!-- Opened; closed; Pending old?? -->
        <h3>All Issues (Tagged) </h3>
        <table>
            <thead>
            <tr>
                <th>Summary</th>
                <th v-for="label of issue_columns.map(extractLabel)">
                    {{ label }}
                    <span class="arrow"></span>
                </th>
                <th>MetaData</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry of view_issues">
                <td>
                    <div class="metadata">
                        <a href="https://aduanku.my/report/{{ entry.refid }}"
                           target="_blank">{{ entry.data.title[0] }} ({{ entry.data.service_code[0] }})</a>
                        Status: {{ entry.data.status[0] }}
                        {{ entry.data.requestor_name[0] }} reported on {{ entry.data.requested_datetime[0] }}
                    </div>
                </td>
                <td v-for="key of issue_columns.map(extractKey)">
                    {{ entry.data[key][0] }}
                </td>
                <td>
                    <div class="metadata">
                        Updated: {{ entry.data.updated_datetime[0] }}
                        Authority Responsible: {{ entry.data.agency_responsible[0].recipient[0] }}
                        <button @click.prevent=updateCurrentIssueLocation(
                                {{ entry.data.lat[0] }}, {{ entry.data.lng[0] }})>
                            View Map
                        </button>
                    </div>

                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <div class="col-md-6 portfolio-item">
        <!-- GMaps here ... changes when mylat, mylng .. -->
        <gmaps :mylat=current_issue_location.lat
               :mylng=current_issue_location.lng mapid="aduanku"></gmaps>
    </div>

</template>

<script>

    import util from 'util'
    import Model from './Aduanku/Model'
    import GMaps from './GMaps.vue'

    export default {
        props: [],
        components: {
            gmaps: GMaps
        },
        data () {
            return {
                current_authority: null,
                current_topic: null,
                issue_columns: [
                    {
                        key: "description",
                        label: "Full Description"
                    }
                ],
                view_issues: null,
                current_issue_location: {
                    lat: null,
                    lng: null
                }
            }
        },
        watch: {},
        ready () {
            // Debug:
            // console.error("Ready ..")
            const p = Model.getAllIssues()
            p.then(
                    function (value) {
                        // this.err("VAL:", util.inspect(value))
                        this.view_issues = value
                    }.bind(this)
            ).catch(
                    function (err) {
                        this.err("ERR", err)
                    }
            )

        },
        methods: {
            extractLabel: function (i) {
                return i.label
            },
            extractKey: function (i) {
                return i.key
            },
            chooseTopicToShow: function () {

                const p = Model.getAllIssuesByTopic(this.current_topic)
                p.then(
                        function (value) {

                        }.bind(this)
                ).catch(
                        function (err) {

                        }
                )
            },
            updateCurrentIssueLocation: function (lat, lng) {
                this.current_issue_location.lat = lat
                this.current_issue_location.lng = lng
            }
        },
        computed: {
            selected_latlng: function () {
                return `${this.current_issue_location.lat},${this.current_issue_location.lng}`
            }
        }
    }

</script>