<style>
    .search-bar {
        border-radius: 70%;
        border-color: #006600;
    }
</style>

<template>
    <div class="navbar">
        <div class="nav">
            <tooltip
                    trigger="focus"
                    effect="scale"
                    placement="bottom"
                    content="Enter your IC number here; free formed is fine as well filter out non-num!! :)"
            >
                <input type="text" class="search-bar" value="{{ msg }}"/>
            </tooltip>
            <tooltip
                    effect="fadein"
                    placement="bottom"
                    content="Press this button .. dammit!"
            >
                <button class="btn btn-default">Search</button>
            </tooltip>
        </div>
    </div>
</template>

<script>

    import { tooltip } from 'vue-strap';

    export default {
        components: {
            tooltip
        },
        props: ['msg'],
        data () {
            return {
                msg: 'Hello World!!'
            }
        }
    }
</script>