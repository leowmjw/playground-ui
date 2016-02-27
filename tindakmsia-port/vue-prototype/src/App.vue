<style>

</style>

<template>
    <div>
        <!-- Activate components that you want to play with -->
        <gmaps mylat="-12.043333" mylng="-77.028333" mapid="manju"></gmaps>
        <!-- 3.07898 101.4677 -->
        <gmaps mylat="3.07898" mylng="101.4677" mapid="michael"></gmaps>
    </div>
    <!-- Deactivated, copy to below ..
    <dashboard></dashboard>
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

