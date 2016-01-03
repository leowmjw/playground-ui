<style>
    .search-bar {
        border-radius: 70%;
        border-color: #006600;
    }
</style>

<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle"
                        aria-expanded="false" aria-controls="navbar"
                        @click="navState.collapse ? navState.collapse=false : navState.collapse=true"
                >
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="javascript:;">EC Checker 2016 vRocket!!!</a>
            </div>
            <div class="navbar-collapse" :class="navState">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Settings</a></li>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Help</a></li>
                </ul>
                <form class="navbar-form navbar-right">
                    <tooltip
                            trigger="focus"
                            effect="scale"
                            placement="bottom"
                            content="Enter your IC number here; free formed is fine as well filter out non-num!! :)"
                    >
                        <input type="text" class="form-control" placeholder="Search..." value="{{ msg }}"/>
                    </tooltip>
                    <tooltip
                            effect="fadein"
                            placement="bottom"
                            content="Press this button .. dammit!"
                    >
                        <button class="btn btn-default">Search</button>
                    </tooltip>
                </form>
            </div>
        </div>
    </nav>

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
        props: ['myMessage'],
        data () {
            return {
                msg: 'Hello World!!',
                navState: {
                    'collapse': true
                }

            }
        }
    }
</script>