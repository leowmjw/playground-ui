<style>
    .search-bar {
        border-radius: 70%;
        border-color: #006600;
    }
</style>

<template>
    <input type="text" class="search-bar" value="{{ msg }}"/>
</template>

<script>

    export default {
        props: ['msg'],
        data () {
            return {
                msg: 'Hello World!!'
            }
        }
    }
</script>