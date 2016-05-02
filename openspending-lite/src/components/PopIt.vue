<style>

</style>

<template>

    <!-- Type -->
    <h3>Type: {{ type }}</h3>
    <h4>Parliament {{ pnum }}</h4>
    <!-- Search Bar with Debounce -->

    <!-- Put image here; that self adjusts via thumbor?? -->

    <!-- Vue Grid List COmponents; use here -->
    <div class="col-xs-8">
        {{ result }}
    </div>

</template>

<script>
    import Utils from './PopIt/Utils'
    import Model from './PopIt/Model'

    let util = require('util');

    export default  {
        props: ['mytype', 'pnum'],
        components: {},
        data () {
            return {
                // type: person, post, organization, membership
                type: "person",
                result: "BOB"
            }
        },
        ready () {

            if (this.mytype != null && this.mytype != undefined) {
                this.type = this.mytype
            }
            // Get the list of most popular MPs? if type is MP?

            // If has Orgcode; prepopulate and  preselect?
            if (this.pnum == "ARANGODB") {
                // this.result = JSON.stringify(Model.getPostsByStates(['Selangor']))
                //  console.log(this.result)
                Model.getPostsByStates.call(this, ['Selangor'])
                // self.result = JSON.stringify({ bob: "ccco"})
            }
        },
        methods: {
            searchByKeyword: function () {

            }
        }

    }

</script>