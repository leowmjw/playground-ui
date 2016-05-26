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
</style>

<template>
    <div class="col-md-6 portfolio-item">
        <!-- Drop down of Authority to select -->
        <!-- For now just list down the important ones .. -->
        <select>
            <option value="">Choose Focus Topic</option>
        </select>
        <template v-if="current_topic">
            <h3>Selected Topic {{ current_topic }}</h3>
        </template>
        <!-- Opened; closed; Pending old?? -->
        <h3>All Issues</h3>
        <table>
            <thead>
            <tr>
                <th>RefID</th>
                <th v-for="label of issue_columns.map(function (i) { return i.label })">
                    {{ label }}
                    <span class="arrow"></span>
                </th>
                <th>Location</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="entry of view_issues">
                <td>
                <a href="https://aduanku.my/report/{{ entry.refid }}" target="_blank">{{ entry.data.title[0] }}</a>
                </td>
                <td v-for="key of issue_columns.map(function (i) { return i.key })">
                    {{ entry.data[key][0] }}
                </td>
                <td>{{ entry.data.lat[0] }}, {{ entry.data.lng[0] }}</td>
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
                current_topic: null,
                issue_columns: [
                    {
                        key: "description",
                        label: "Full Description"
                    },
                    {
                        key: "status",
                        label: "Status"
                    },
                    {
                        key: "service_code",
                        label: "Code"
                    },
                    {
                        key: "requestor_name",
                        label: "Reported By"
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
                        this.err("VAL:", util.inspect(value))
                        this.view_issues = value
                    }.bind(this)
            ).catch(
                    function (err) {
                        this.err("ERR", err)
                    }
            )

        },
        methods: {
            chooseTopicToShow: function () {

                const p = Model.getAllIssuesByTopic(this.current_topic)
                p.then(

                ).catch(

                )
            }
        },
        computed: {}

    }

</script>