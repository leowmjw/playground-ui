<style>

</style>

<template>
    <div>
        <div>
            <voter-search-bar :msg=parentMsg />
        </div>
        <div>
            <input v-model="parentMsg"/><br/>
        </div>
        <div>
            <mapvisualization :my-message=parentMsg></mapvisualization>
            <!--
                <div>
                    <ecResults></ecResults>
                    <mapitResults></mapitResults>
                </div>
            -->
        </div>
        bob
    </div>
</template>

<script>
    import voterSearchBar from './components/voterSearchBar.vue';
    import mapvisualization from './components/mapVisualization.vue';

    module.exports =
    {
        components: {
            'voter-search-bar': voterSearchBar,
            mapvisualization
        },
        data () {
            return {
                parentMsg: ""
            }
        }
    }

</script>

