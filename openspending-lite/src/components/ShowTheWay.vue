<style>
    @font-face {
        font-family: "showtheway";
        src: url("https://showtheway.io/fonts/showtheway.eot");
        src: url("https://showtheway.io/fonts/showtheway.eot?#iefix") format("embedded-opentype"),
        url("https://showtheway.io/fonts/showtheway.woff") format("woff"),
        url("https://showtheway.io/fonts/showtheway.ttf") format("truetype"),
        url("https://showtheway.io/fonts/showtheway.svg#showtheway") format("svg");
    }

    i.showtheway-icon {
        font-family: 'showtheway';
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    i.showtheway-icon-app:before {
        content: "\e600";
    }

    .showtheway a {
        display: inline-block;
    }

    span.showtheway {
        display: inline-block;
    }

    .showtheway-popup-ul {
        background: #fff;
        border: 1px solid #ccc;
        color: #333;
        font-family: "Roboto", Helvetica, Arial, sans-serif;
        font-size: 1em;
        line-height: normal;
        min-width: 150px;
        position: absolute;
        z-index: 500;
    }

    .showtheway-popup-ul a {
        background: #fff;
        color: #333;
        display: block;
        padding: 10px 16px;
        text-decoration: none;
    }

    .showtheway-popup-ul a small {
        color: #777777;
    }

    .showtheway-popup-ul a:hover,
    .showtheway-popup-ul a:focus,
    .showtheway-popup-ul a.focus {
        color: #fff;
        background: #00A368;
    }

    .showtheway-popup-ul a:hover small,
    .showtheway-popup-ul a:focus small,
    .showtheway-popup-ul a.focus small {
        color: #fff;
    }

    .showtheway-popup-ul a * {
        vertical-align: middle;
    }

    .showtheway-popup-ul .showtheway-popup-li-last {
        border-top: 1px solid #ccc;
    }

    .showtheway-popup-ul .showtheway-popup-li-last::after {
        clear: both;
    }

    .showtheway-popup-ul .showtheway-popup-li-last a {
        padding: 1px 5px;
        vertical-align: middle;
    }

    .showtheway-popup-ul .showtheway-popup-li-last .showtheway-a {
        display: inline-block;
        float: left;
        font-size: smaller;
    }

    .showtheway-popup-ul .showtheway-popup-li-last .showtheway-popup-hide {
        float: right;
    }
</style>

<template>
    <div class="showtheway">
        <template v-if=popup>
            <div><img
                    class="showtheway-app-image" alt="Show the Way" title="Show the Way"
                    src="https://showtheway.io/img/showtheway-app-lg.png"
                    srcset="https://showtheway.io/img/showtheway-app-lg@2x.png 2x,
                    https://showtheway.io/img/showtheway-app-lg@3x.png 3x,
                    https://showtheway.io/img/showtheway-app-lg@4x.png 4x"
                    style="height: 2em; line-height: normal;"
            ></div>
            <div class="showtheway-popup-ul">

                <a
                        class="showtheway-a showtheway-google-maps" target="_blank" data-w="1"
                        title="Show the way with Google Maps"
                        href="https://showtheway.io/to/{{mylat}},{{mylng}}?name=#google-maps"
                        style="line-height: normal;"
                >
                    <img class="showtheway-google-maps-image" alt="Google Maps"
                         title="Show the way with Google Maps"
                         src="https://showtheway.io/img/showtheway-google-maps.png"
                         srcset="https://showtheway.io/img/showtheway-google-maps@2x.png 2x,
                                 https://showtheway.io/img/showtheway-google-maps@3x.png 3x,
                                 https://showtheway.io/img/showtheway-google-maps@4x.png 4x"
                         style="height: 1.5em; line-height: normal;">
                    <span class="showtheway-google-maps-text" title="Show the way with Google Maps"> Google Maps</span>
                </a>
                <a
                        class="showtheway-a showtheway-apple-maps" target="_blank" data-w="1"
                        title="Show the way with Apple Maps"
                        href="https://showtheway.io/to/{{mylat}},{{mylng}}?name=#apple-maps"
                        style="line-height: normal;">
                    <img class="showtheway-apple-maps-image" alt="Apple Maps"
                         title="Show the way with Apple Maps"
                         src="https://showtheway.io/img/showtheway-apple-maps.png"
                         srcset="https://showtheway.io/img/showtheway-apple-maps@2x.png 2x,
                                 https://showtheway.io/img/showtheway-apple-maps@3x.png 3x,
                                 https://showtheway.io/img/showtheway-apple-maps@4x.png 4x"
                         style="height: 1.5em; line-height: normal;">
                    <span class="showtheway-apple-maps-text" title="Show the way with Apple Maps"> Apple Maps</span>
                </a>
                <a
                        class="showtheway-a showtheway-waze" target="_blank" data-w="1" title="Show the way with Waze"
                        href="https://showtheway.io/to/{{mylat}},{{mylng}}?name=#waze"
                        style="line-height: normal;">
                    <img class="showtheway-waze-image" alt="Waze <small>(for mobile)</small>"
                         title="Show the way with Waze"
                         src="https://showtheway.io/img/showtheway-waze.png"
                         srcset="https://showtheway.io/img/showtheway-waze@2x.png 2x,
                                 https://showtheway.io/img/showtheway-waze@3x.png 3x,
                                 https://showtheway.io/img/showtheway-waze@4x.png 4x"
                         style="height: 1.5em; line-height: normal;">
                    <span class="showtheway-waze-text" title="Show the way with Waze"> Waze <small>(for mobile)</small></span>
                </a>
                <a
                        class="showtheway-a showtheway-uber" target="_blank" data-w="1" title="Show the way with Uber"
                        href="https://showtheway.io/to/{{mylat}},{{mylng}}?name=#uber"
                        style="line-height: normal;">
                    <img class="showtheway-uber-image"
                         alt="Uber <small>(for mobile)</small>"
                         title="Show the way with Uber"
                         src="https://showtheway.io/img/showtheway-uber.png"
                         srcset="https://showtheway.io/img/showtheway-uber@2x.png 2x,
                                 https://showtheway.io/img/showtheway-uber@3x.png 3x,
                                 https://showtheway.io/img/showtheway-uber@4x.png 4x"
                         style="height: 1.5em; line-height: normal;">
                    <span class="showtheway-uber-text" title="Show the way with Uber"> Uber <small>(for mobile)</small></span>
                </a>
                <a
                        class="showtheway-a showtheway-app" target="_blank" data-w="1" title="Show the Way"
                        href="https://showtheway.io/to/{{mylat}},{{mylng}}"
                        style="line-height: normal;">
                    <img class="showtheway-app-image" alt="More..." title="Show the Way"
                         src="https://showtheway.io/img/showtheway-app.png"
                         srcset="https://showtheway.io/img/showtheway-app@2x.png 2x,
                                 https://showtheway.io/img/showtheway-app@3x.png 3x,
                                 https://showtheway.io/img/showtheway-app@4x.png 4x"
                         style="height: 1.5em; line-height: normal;">
                    <span class="showtheway-app-text" title="Show the Way"> More...</span>
                </a>
                <div class="showtheway-popup-li-last">
                    <a class="showtheway-a showtheway-app" target="_blank" data-w="1"
                       title="Show the Way"
                       href="https://showtheway.io/"
                       style="line-height: normal;">
                        <i class="showtheway-icon showtheway-icon-app" title="Show the Way"></i>
                        <span class="showtheway-app-text" title="Show the Way"> Show the Way</span>
                    </a>
                    <a class="showtheway-popup-hide"
                       title="Close this Show the Way popup"
                       href="#" @click.stop.prevent="popup=false">×</a>
                </div>
            </div>
        </template>
        <template v-else>
            <a class="showtheway-a showtheway-app showtheway-popup" target="_blank" data-w="1" title="Show the Way"
               href="#" @click.stop.prevent="popup=true">
                <img
                        class="showtheway-app-image" alt="Show the Way" title="Show the Way"
                        src="https://showtheway.io/img/showtheway-app-lg.png"
                        srcset="https://showtheway.io/img/showtheway-app-lg@2x.png 2x,
                                https://showtheway.io/img/showtheway-app-lg@3x.png 3x,
                                https://showtheway.io/img/showtheway-app-lg@4x.png 4x"
                        style="height: 2em; line-height: normal;">

            </a>
        </template>
    </div>


</template>

<script>

    let util = require('util')

    // TODO: Add for HERE, Bing
    // TODO: Add mobile device detection so that the ordering will be different based on detected device?
    // TODO: Add prop for the "Name" of the location; so it looks nicer when displayed in ShowtheWay
    // TODO: Refactor the common structure, can be placed in a loop
    // TODO: According to Arief; there are alternative layouts; horizontal layout too ..
    export default {
        props: ['mylat', 'mylng'],
        components: {},
        data () {
            return {
                popup: false
            }
        },
        ready () {

        },
        methods: function () {

        },
        computed: function () {

        }

    }
</script>