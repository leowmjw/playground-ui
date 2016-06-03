<style>
    .placeholder {
        margin-bottom: 20px;
    }

    .placeholder h4 {
        margin-bottom: 0;
    }

    .placeholder img {
        display: inline-block;
        border-radius: 40%;
    }

</style>

<template>
    <!-- Search -->
    <div class="col-md-6">
        <div class="placeholder">
            <input type="text" v-model="keyword"
                   @keyup="searchByKeyword | debounce 300"
                   placeholder="Search Name (Tony, Aziz)"
            >
        </div>
        <div class="placeholder">
            <h3>DEBUG: Turn off in config.js</h3>
            {{ debugresult }}
        </div>
        <div class="placeholder" v-for="item in result">
            <img :src="item.image ? item.image.toString() :
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Replace_this_image_female.svg/150px-Replace_this_image_female.svg.png'"
                 width="100" height="auto"
                 class="img-thumbnail" alt="{{ item.area.id ? item.area.id.toString() : '' }}">
            <h4>{{ item.name ? item.name.toString() : '' }}</h4>
            <span class="text-muted">
                {{ item.area.id ? item.area.id.toString() : '' }}:
                {{ item.label ? item.label.toString() : '' }},
                {{ item.area.state ? item.area.state.toString() : '' }}
            </span>
            <button @click="filterByArea(item.area.id ? item.area.id.toString() : '')">Filter Area</button>
        </div>
    </div>
    <div class="col-md-6 placeholder">
        <div class="placeholder">
            <input type="text" v-model="state.keyword"
                   @keyup="searchAreaByKeyword | debounce 300"
                   placeholder="Search Area (P001, Serdang) .."
            >
        </div>
        <div class="placeholder">
            <h3>DEBUG: Turn off in config.js</h3>
            {{ state.debugresult }}
        </div>
        <div class="placeholder" v-for="item in state.result">
            <img :src="item.image ? item.image.toString() :
            'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Replace_this_image_female.svg/150px-Replace_this_image_female.svg.png'"
                 width="100" height="auto"
                 class="img-thumbnail" alt="{{ item.area.id ? item.area.id.toString() : '' }}">
            <h4>{{ item.name ? item.name.toString() : '' }}</h4>
            <span class="text-muted">
                {{ item.area.id ? item.area.id.toString() : '' }}:
                {{ item.label ? item.label.toString() : '' }},
                {{ item.area.state ? item.area.state.toString() : ''  }}
            </span>
            <button @click="showAreaMap(item.area.id ? item.area.id.toString() : '')">Show Area Map</button>
        </div>
    </div>
    <!-- Debounce -->

</template>

<script>
    import Utils from './MPSearch/Utils'
    import Model from './MPSearch/Model'

    let util = require('util')

    export default {
        props: ['searcharea', 'selectedarea'],
        components: {},
        data () {
            return {
                // type: person, post, organization, membership
                msg: null,
                keyword: null,
                result: null,
                debugresult: null,
                state: {
                    keyword: null,
                    result: null,
                    debugresult: null
                }
            }
        },
        watch: {
            'selectedarea': function (val, old) {
                // When area change; MP too?
                console.error("AREA CHANGED!!!! NEW: %s OLD: %s", val, old)
                // TODO: Trigger searchByArea ..
                /* UPdate like below??
                 this.selectedarea = area_id
                 this.state.keyword = area_id
                 this.searchAreaByKeyword()

                 */
            }

        },
        ready () {

        },
        methods: {
            searchByKeyword: function () {
                // Always reset the selected when a search is triggered
                // this.selectedarea = null

                // Try to search by Person Name ..

                // Try tp search by Organization Name ..
                this.msg = "Found result for " + this.keyword

                Model.search.call(this, this.keyword)
                // Model.searchMultiple.call(this, this.keyword)
            },
            searchAreaByKeyword: function () {
                // Always reset the selected when a search is triggered
                // this.selectedarea = null

                this.msg = "Found Area result for " + this.state.keyword

                Model.searchArea.call(this.state, this.state.keyword)

            },
            filterByArea: function (area_id) {
                area_id = area_id.trim()
                if (area_id == null || area_id == undefined || area_id == '') {
                    console.error("Nothing to do ..")
                } else {
                    this.searcharea = area_id
                    this.selectedarea = area_id
                    this.state.keyword = area_id
                    this.searchAreaByKeyword()
                }
            },
            showAreaMap: function(area_id) {
                area_id = area_id.trim()
                if (area_id == null || area_id == undefined || area_id == '') {
                    console.error("Nothing to do ..")
                } else {
                    // this.searcharea = area_id
                    this.selectedarea = area_id
                }
            },
            debugObject: function (myObj) {
                // return myObj.values()
                return util.inspect(myObj)
            }
        }
    }

</script>