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
    <voter-search-bar :my-message=parentMsg></voter-search-bar>
    <div class="container-fluid">
        <div class="row">
            <navsidebar></navsidebar>
            <maincontent></maincontent>
        </div>
    </div>
</template>

<script>
    import voterSearchBar from './components/voterSearchBar.vue';
    import navsidebar from './components/navSidebar.vue';
    import maincontent from './components/mainContent.vue';

    module.exports =
    {
        components: {
            'voter-search-bar': voterSearchBar,
            navsidebar,
            maincontent
        },
        data () {
            return {}
        }
    }

</script>

