<style>

</style>

<template>
    <div>
        <!-- Activate components that you want to play with -->
        <gmaps mylat="3.1443" mylng="101.6057" mapid="manju"></gmaps>
        <!-- Lat: 3.0765802072620043 Lng: 101.52400493164055 -->
        <gmaps mylat="3.07658" mylng="101.5240" mapid="michael"></gmaps>
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

