<style>
    /*
     * Base structure
     */

    /* Move down content because we have a fixed navbar that is 50px tall */
    body {
        padding-top: 50px;
    }

    /*
     * Global add-ons
     */

    .sub-header {
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }

</style>

<template>
    <voter-search-bar :my-message.sync=parentMsg></voter-search-bar>
    <div class="container-fluid">
        <!-- Debugginng
        <div class="row">
            myMessage is {{ parentMsg }}
        </div>
        -->
        <div class="row">
            <navsidebar></navsidebar>
            <maincontent :my-message=parentMsg></maincontent>
        </div>
    </div>
</template>

<script>
    import voterSearchBar from './components/voterSearchBar.vue';
    import navsidebar from './components/navSidebar.vue';
    import maincontent from './components/mainContent.vue';

    // Test out component for Google Maps
    // https://github.com/GuillaumeLeclerc/vue-google-maps-example

    // Test out components for Leaflet
    // https://www.npmjs.com/package/vue-leaflet

    // Test out visualization
    // http://c3js.org/

    // Test out panels
    // https://github.com/ericmcdaniel/vue-panel

    module.exports =
    {
        components: {
            'voter-search-bar': voterSearchBar,
            navsidebar,
            maincontent
        },
        data () {
            return {
                parentMsg: ""

            }
        }
    }

</script>

