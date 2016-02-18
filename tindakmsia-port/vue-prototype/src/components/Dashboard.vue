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

    import voterSearchBar from './voterSearchBar.vue';
    import navsidebar from './navSidebar.vue';
    import maincontent from './mainContent.vue';

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