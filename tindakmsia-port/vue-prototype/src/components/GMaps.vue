<style>
    /*
    body {
        background: #f3f3f3;
        margin: 0;
        padding: 0;
        font-family: 'Helvetica', 'Arial', sans-serif;
    }

    h1 {
        font-family: 'Convergence';
        font-size: 95px;
        text-align: center;
        letter-spacing: -6px;
        margin: 8px 0;
        text-shadow: 0 0 1px #000;
    }

    h2 {
        font-family: 'Bitter';
        font-size: 20px;
        font-weight: normal;
        color: #5588bb;
        text-shadow: 0 0 1px #5588bb;
        text-align: center;
        margin: 6px 0;
        text-transform: lowercase;
    }

    h3 {
        margin: 8px 0;
    }

    h4 {
        margin: 6px 0;
    }

    a {
        color: #5588bb;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    p.big {
        font-family: 'Droid Sans';
        font-size: 24px;
        color: #333;
    }

    p.centered {
        text-align: center;
    }

    #header, #body {
        width: 800px;
        margin: 0 auto;
    }

    #body {
        margin: 20px auto;
    }

    #header a {
        color: #000;
    }

    #header a:hover {
        text-decoration: none;
    }
*/
    .row {
        margin: 24px;
    }

    /*

    .btn {
        color: #fff;
        text-decoration: none;
        padding: 10px 20px;
        margin: 0 2px;
        border-radius: 3px;
        border-top: #4c82b7 solid 1px;
        border-left: #4c82b7 solid 1px;
        border-bottom: #3e6d9c solid 1px;
        border-right: #3e6d9c solid 1px;
        background: #4477aa;
        background-image: linear-gradient(bottom, rgb(59, 104, 149) 50%, rgb(68, 119, 170) 100%);
        background-image: -o-linear-gradient(bottom, rgb(59, 104, 149) 50%, rgb(68, 119, 170) 100%);
        background-image: -moz-linear-gradient(bottom, rgb(59, 104, 149) 50%, rgb(68, 119, 170) 100%);
        background-image: -webkit-linear-gradient(bottom, rgb(59, 104, 149) 50%, rgb(68, 119, 170) 100%);
        background-image: -ms-linear-gradient(bottom, rgb(59, 104, 149) 50%, rgb(68, 119, 170) 100%);

        background-image: -webkit-gradient(
                linear,
                left bottom,
                left top,
                color-stop(0.5, rgb(59, 104, 149)),
                color-stop(1, rgb(68, 119, 170))
        );
    }
    */

    .popin {
        background: #fff;
        padding: 15px;
        box-shadow: 0 0 20px #999;
        border-radius: 2px;
    }

    /*
    ul.gallery {
        list-style: none;
        margin: 0;
        padding: 0;
        width: 100%;
    }

    ul.gallery li {
        font-family: 'Droid Sans';
        display: inline-block;
        width: 30%;
        background: #fff;
        padding: 10px 8px;
        margin: 4px 1px;
        border-radius: 3px;
        border: solid 1px #ddd;
    }

    ul.gallery li:hover {
        background: #f3f3f3;
    }

    ul.gallery li a {
        display: block;
    }

    ul.gallery li h5 {
        font-weight: normal;
        margin: 0;
        font-size: 16px;
    }
*/

    #map,
    #panorama {
        height: 300px;
        background: #6699cc;
    }

    /*
    #sponsors {
        font-size: 12px;
        text-align: center;
        padding: 4px 6px;
    }

    #sponsors img {
        height: 40px;
        margin: 4px;
    }

    code {
        font-family: 'Ubuntu Mono', 'Monaco', 'Andale Mono', 'Courier New', monospace;
        font-weight: bold;
    }
*/
</style>

<template>
    <h3>MapIt Postcode Lookup Example</h3>
    <div class="row">
        Lat: {{ location_marker.lat }}<input type="hidden" value="{{ mylat }}" v-model="location_marker.lat"/>
        Lng: {{ location_marker.lng }}<input type="hidden" value="{{ mylng }}" v-model="location_marker.lng"/><br/>
        <button @click=initGmaps>initGmaps!</button>
    </div>
    <div class="row">
        <div class="span11">
            <div class="popin">
                <div id="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Utils from './GMaps/Utils';

    // Future: Import the google API here; as well as gmaps?  Use the npm?
    let self;

    export default {
        props: ['mylat', 'mylng'],
        data: function () {
            return {
                mymap: null,
                mymarker: null,
                location_marker: {lat: null, lng: null},
                polygon_par: null,
                polygon_dun: null,
                polygon_are: null,
                polygon_dm: null,
            }
        },
        ready () {
            // Get User's location; provide default else?
            // Or maybe mark and have the input boxes be active ..
            this.initGmaps();
        },
        methods: {
            callMe: function () {
                console.log("CALL ME ... maybe ..")
            },
            initGmaps: function () {
                // Terrible hack but it works :P
                self = this;
                // Only do something if it is NOT set ..
                if (this.mymap === null) {
                    // Init ..
                    let final_lat;
                    let final_lng;

                    // Figure out which is the lat, lng
                    if (
                            !(this.mylat === null || this.mylat === undefined)
                            && !(this.mylng === null || this.mylng === undefined)
                    ) {
                        final_lat = this.mylat;
                        final_lng = this.mylng;
                        console.log("Scenario #1: init process ... Lat is " + final_lat + " Lng is " + final_lng)

                    } else if (
                            !(this.location_marker.lat === null || this.location_marker.lat === undefined || this.location_marker.lat === "")
                            && !(this.location_marker.lng === null || this.location_marker.lng === undefined || this.location_marker.lng === "")

                    ) {
                        console.log("Scenario #2: init process ... Lat is " + this.location_marker.lat +
                                " Lng is " + this.location_marker.lng)
                        final_lat = this.location_marker.lat;
                        final_lng = this.location_marker.lng;
                    } else {
                        console.log("Cannot init!")
                    }

                    // OK, now create the Map and Marker ...
                    this.mymap, this.mymarker = Utils.setupMapMarker(self, final_lat, final_lng)
                    //this.mymap = Utils.setupMap(self, final_lat, final_lng)
                    //this.mymarker = Utils.setupMarker(this.mymap, this.location_marker, final_lat, final_lng)

                } else {

                }
            },
            altGmaps: Utils.createGMaps,
            createAllMarkers: function () {

            },
            createAllPolygon: function () {
                // Create PAR
                // Create DUN
                // Create ARE
                // Create DM

            }
        }
        // Need a method that runs on load??
    }
</script>