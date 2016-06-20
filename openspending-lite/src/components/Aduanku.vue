<style scoped>
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
    <div class="col-md-6 portfolio-item" v-show="isShowResult">
        <!-- Drop down of Authority to select -->
        <!-- For now just list down the important ones .. -->
        <select v-model="current_topic" @change="chooseTopicToShow">
            <option value="" selected="selected">Choose Focus Topic</option>
            <option value="health">Health</option>
            <option value="childsafety">Child Safety</option>
            <option value="cycling">Cycling</option>
            <option value="oku">Orang Kurang Upaya Issues</option>
        </select>
        <template v-if="current_topic">
            <h3>Selected Topic {{ current_topic }}</h3>
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
                    <div>
                        <a href="https://aduanku.my/report/{{ entry.refid }}"
                           target="_blank">{{ entry.refid }} ({{ entry.data.status[0] }})</a>
                    </div>
                </td>
                <td v-for="key of issue_columns.map(extractKey)">
                    {{ entry.data[key][0] }}
                </td>
                <td>
                    <div class="metadata">
                        {{ entry.data.requestor_name[0] }} reported on {{ entry.data.requested_datetime[0] }}
                        Updated: {{ entry.data.updated_datetime[0] }} <br/>
                        Code: {{ entry.data.service_code[0] }} <br/>
                        Authority Responsible: {{ entry.data.agency_responsible[0].recipient[0] }}
                        <button @click.prevent.stop=updateCurrentIssueLocation(entry.data)>
                            View Map
                        </button>
                    </div>

                </td>
            </tr>
            </tbody>
        </table>
    </div>

    <template v-if="loadDetailsOnce">
        <div class="col-md-8 portfolio-item" v-show="!isShowResult">
            <div>
                <p><a href="#" @click.prevent.stop="backToResults()"><< Back </a></p>
            </div>
            <div>
                <!-- GMaps here ... changes when mylat, mylng .. -->
                <gmaps :selectedarea="selectedarea" mapid="aduanku"></gmaps>
                <!--
                <gmaps :mylat=current_issue_location.lat
                       :mylng=current_issue_location.lng mapid="aduanku"></gmaps>
                       -->
            </div>
        </div>
        <div class="col-md-4 portfolio-item" v-show="!isShowResult">
            <mpsearch :selectedarea="selectedarea" type="area"></mpsearch>
        </div>
    </template>

</template>

<script>

    import util from 'util'
    // Libs for Aduanku Component
    import Model from './Aduanku/Model'
    import Utils from './Aduanku/Utils'
    // Related Components
    import GMaps from './GMaps.vue'
    import MPSearch from './MPSearch.vue'

    export default {
        props: ['selectedarea'],
        components: {
            gmaps: GMaps,
            mpsearch: MPSearch
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
                },
                isShowResult: true,
                hasMapLoaded: false
            }
        },
        watch: {},
        events: {},
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
                // DEBUG:
                // console.error("Call getAllIssuesByTopic with PARAM: ", this.current_topic)
                const p = Model.getAllIssuesByTopic(this.current_topic)
                p.then(
                        function (value) {
                            this.view_issues = value
                        }.bind(this)
                ).catch(
                        function (err) {
                            console.error("PROMISE/getAllIssuesByTopic:", err)
                        }
                )
            },
            updateCurrentIssueLocation: function (data) {
                // Set the status for View to be updated; need to do this as early as possible; otherwise the rest does not work!
                this.isShowResult = false
                // console.error("DATA:", data)
                // Bind the context here; to be used based on whether it is the find time loaded
                const getLocation = Utils.getLocation.bind(this)

                if (this.hasMapLoaded === false) {
                    this.$on('finish-map-setup', function () {
                        // DEBUG:
                        // console.error("CATCAH: finish-map-setup")
                        // console.error("DEFERRED getLocation!!!")
                        getLocation(this)
                        // NOTE: Behavior below removed cause result is hidden when clicked :P
                        // Visually; slect gmaps with class "portfolio-item" marked up
                        const issue_gmaps = document.querySelector("div#map-aduanku")
                        // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                        issue_gmaps.scrollIntoView()
                    }.bind(data))
                } else {
                    // Call immediately once a map has been loaded ..
                    // console.error("NORMAL getLocation!!!")
                    getLocation(data)
                    // NOTE: Behavior below removed cause result is hidden when clicked :P
                    // Visually; slect gmaps with class "portfolio-item" marked up
                    const issue_gmaps = document.querySelector("div#map-aduanku")
                    // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
                    issue_gmaps.scrollIntoView()
                }
            },
            backToResults: function () {
                // Set the status for View to be updated
                this.isShowResult = true
            }
        },
        computed: {
            selected_latlng: function () {
                return `${this.current_issue_location.lat},${this.current_issue_location.lng}`
            },
            loadDetailsOnce: function () {
                // Use this to load GMaps only once; after that just show/hide
                if (this.hasMapLoaded === false) {
                    // Now has show details the first time
                    if (this.isShowResult === false) {
                        // do something ... set flag up ..
                        this.hasMapLoaded = true
                        return true
                    } else {
                        return false
                    }
                }
                // Always true once hasMapLoaded ..
                return true
            }
        }
    }

</script>