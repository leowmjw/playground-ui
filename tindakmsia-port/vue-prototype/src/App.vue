<style>

</style>

<template>
    <!-- Activate components that you want to play with -->
    <dashboard></dashboard>
    <!-- Deactivated, copy to below ..
    <gmaps></gmaps>
    -->
</template>

<script>
    import Dashboard from './components/Dashboard.vue';
    import GMaps from './components/GMaps.vue';

    // Test out hybrid component for GMaps
    // https://github.com/hpneo/gmaps

    // Test out component for Google Maps
    // https://github.com/GuillaumeLeclerc/vue-google-maps-example
    // FAILED!  Need to try again :(

    // Test out components for Leaflet
    // https://www.npmjs.com/package/vue-leaflet

    // Test out visualization
    // http://c3js.org/

    // Test out panels
    // https://github.com/ericmcdaniel/vue-panel

    export default {
        components: {
            dashboard: Dashboard,
            gmaps: GMaps
        }

    }
</script>

