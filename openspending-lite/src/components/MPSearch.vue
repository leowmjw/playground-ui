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
        <div class="col-md-6 placeholder">
            <input type="text" v-model="keyword"
                   @keyup="searchByKeyword | debounce 300"
                   placeholder="Search Name ..."
                   >
        </div>
        <div class="col-md-6 placeholder" v-for="item in result">
            <img src="{{ item.image.toString() }}"
                 width="100" height="auto"
                 class="img-thumbnail" alt="Generic placeholder thumbnail">
            <h4>{{ item.name.toString() }}</h4>
            <span class="text-muted">
                {{ item.area.id.toString() }}:
                {{ item.label.toString() }},
                {{ item.area.state.toString() }}
            </span>
        </div>
    </div>
    <div class="col-md-6 placeholder">
        Searching? {{ msg }}
        <div>{{ debugresult }}</div>
    </div>
    <!-- Debounce -->

</template>

<script>
    import Utils from './MPSearch/Utils'
    import Model from './MPSearch/Model'

    let util = require('util')

    export default {
        props: [],
        components: {},
        data () {
            return {
                // type: person, post, organization, membership
                msg: null,
                keyword: null,
                result: null,
                debugresult: null
            }
        },
        ready () {

        },
        methods: {
            searchByKeyword: function () {
                // Try to search by Person Name ..

                // Try tp search by Organization Name ..
                this.msg = "Found result for " + this.keyword

                Model.search.call(this, this.keyword)
            },
            debugObject: function(myObj) {
                // return myObj.values()
                return util.inspect(myObj)
            }
        }
    }

</script>