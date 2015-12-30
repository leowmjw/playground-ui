<template>
    <div id="app">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    module.export =  {
        data () {
            return {
                // note: changing this line won't causes changes
                // with hot-reload because the reloaded component
                // preserves its current state and we are modifying
                // its initial state.
                msg: 'Hello Vue!'
            }
        }
    }
</script>

<style>
    body {
        font-family: Helvetica, sans-serif;
    }
</style>
<!--
<style>

</style>

<template>
    BOB!!
    <div>
        <voterSearchBar/>
        <div>
            <mapVisualization/>
            <div>
                <ecResults/>
                <mapitResults/>
            </div>
        </div>
    </div>
</template>

<script>
    import voterSearchBar from './components/voterSearchBar.vue';
    import mapVisualization from './components/mapVisualization.vue';
    import ecResults from './components/ecResults.vue';
    import mapitResults from './components/mapitResults.vue';

    export default {
        components: {
            voterSearchBar
        }
    }

</script>

-->