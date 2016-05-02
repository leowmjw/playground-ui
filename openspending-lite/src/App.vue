<style>
    /* Global Style here ... */
    /*!
     * Start Bootstrap - 2 Col Portfolio HTML Template (http://startbootstrap.com)
     * Code licensed under the Apache License v2.0.
     * For details, see http://www.apache.org/licenses/LICENSE-2.0.
     */

    body {
        padding-top: 70px;
        /*
           Required padding for .navbar-fixed-top.
           Remove if using .navbar-static-top. Change if height of navigation changes.
               */
    }

    .gmsg {
        z-index: 1100;
        position: absolute;
        top: 0;
        background-color: red;
        opacity: 20;
    }

</style>

<template>
    <div id="app">
        <div class="has-error gmsg" v-if="gmsg">
            <h2>{{ gmsg }}</h2>
        </div>
        <navigation></navigation>
        <content :gmsg.sync="gmsg"></content>
    </div>
</template>

<script>

    import Navigation from './components/Navigation.vue'
    import Content from './components/Content.vue'

    export default {
        props: [],
        components: {
            navigation: Navigation,
            content: Content
        },
        data () {
            return {
                gmsg: ""
            }
        },
        ready () {
            console.log("Ready dandy", this.gmsg)
            // this.gmsg = "Nu Booties"

        },
        methods: {}
    }

</script>
