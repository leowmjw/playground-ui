<style>

</style>

<template>

    <!-- Type -->
    <h3>Type: {{ type }}</h3>
    <h4>Parliament {{ pnum }}</h4>
    <!-- Search Bar with Debounce -->

    <!-- Put image here; that self adjusts via thumbor?? -->

    <!-- Vue Grid List COmponents; use here -->

</template>

<script>
    "use strict";

    import Utils from './PopIt/Utils'

    let util = require('util');

    export default  {
        props: ['mytype', 'pnum'],
        components: {},
        data () {
            return {
                // type: person, post, organization, membership
                type: "person",
            }
        },
        ready () {

            if (this.mytype != null && this.mytype != undefined) {
                this.type = this.mytype
            }
            // Get the list of most popular MPs? if type is MP?

            // If has Orgcode; prepopulate and  preselect?
        },
        methods: {
            searchByKeyword: function () {

            }
        }

    }

</script>