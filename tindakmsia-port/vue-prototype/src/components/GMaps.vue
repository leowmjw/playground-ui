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
    // Future: Import the google API here; as well as gmaps?  Use the npm?
    let self;

    export default {
        props: ['mylat', 'mylng'],
        data () {
            return {
                mymap: null,
                location_marker: {lat: null, lng: null},
                polygon_par: null,
                polygon_dun: null,
                polygon_are: null,
                polygon_dm: null,
            }
        },
        ready () {
            this.initGmaps();
        },
        methods: {
            callMe: function () {
                console.log("CALL ME ... maybe ..")
            },
            initGmaps: function () {
                // Terrible hack but it works :P
                self = this;
                if (this.mymap === null) {
                    let initial_lat;
                    let initial_lng;

                    if (
                            !(this.mylat === null || this.mylat === undefined)
                            && !(this.mylng === null || this.mylng === undefined)
                    ) {
                        initial_lat = this.mylat;
                        initial_lng = this.mylng;
                        console.log("Scenario #1: init process ... Lat is " + initial_lat + " Lng is " + initial_lng)

                        this.mymap = new GMaps({
                            div: '#map',
                            lat: initial_lat,
                            lng: initial_lng,
                            dragend: function (e) {
                                let lat = e.getCenter().lat();
                                let lng = e.getCenter().lng();
                                console.log("Lat: " + lat + " Lng: " + lng);
                                self.location_marker.lat = lat
                                self.location_marker.lng = lng
                                // self.callMe()
                            }
                        });

                        this.mymap.addMarker({
                            lat: this.mylat,
                            lng: this.mylng,
                            title: 'Voter\'s Location',
                            draggable: true
                        });

                        this.callMe()

                    } else if (
                            !(this.location_marker.lat === null || this.location_marker.lat === undefined || this.location_marker.lat === "")
                            && !(this.location_marker.lng === null || this.location_marker.lng === undefined || this.location_marker.lng === "")

                    ) {
                        console.log("Scenario #2: init process ... Lat is " + this.location_marker.lat +
                                " Lng is " + this.location_marker.lng)
                        this.mymap = new GMaps({
                            div: '#ecmap',
                            lat: this.location_marker.lat,
                            lng: this.location_marker.lng
                        });

                        this.mymap.addMarker({
                            lat: this.location_marker.lat,
                            lng: this.location_marker.lng,
                            title: 'Voter\'s Location',
                            draggable: true
                        });

                    } else {
                        console.log("Cannot init!")
                    }

                } else {
                    console.log("Already init!!")
                    this.mymap.refresh()
                }

                // Next time can actual mount multiple maps?
            },
            createAllMarkers: function () {

            },
            createAllPolygon: function () {

            }
        }
        // Need a method that runs on load??
    }
</script>