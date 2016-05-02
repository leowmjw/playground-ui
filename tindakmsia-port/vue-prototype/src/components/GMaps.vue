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

    .map,
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
        <!-- If need to test clicking initGMaps!
        <button @click=initGmaps>initGmaps!</button>
        -->
        <!-- Put text box where users can copy over the javascript?? -->
        <textarea rows="4" cols="50">
<javascript>\n
    Copy this below\n
    Lat: {{ location_marker.lat }} \n
    Lng: {{ location_marker.lng }} \n
    \n
</javascript>
        </textarea><br/>
        Sample Test ShowtheWay Button:
        <widgetshowtheway :mylat=location_marker.lat :mylng=location_marker.lng></widgetshowtheway>
    </div>
    <div class="row">
        <div>
            <button @click=createAllPolygon>ALL Polygons!</button>
        </div>
        <div class="span11">
            <div class="popin">
                <div id="map-{{ mapid }}" class="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
    // Any additional modules/function ..
    import Utils from './GMaps/Utils';
    // Any components below
    import widgetshowtheway from './widgetShowTheWay.vue';
    // Any thing needed for debugging below
    import util from 'util';

    // Future: Import the google API here; as well as gmaps?  Use the npm?
    let self;

    export default {

        props: ['mylat', 'mylng', 'mapid'],
        components: {widgetshowtheway},
        data: function () {
            return {
                mymap: null,
                mymarker: null,
                location_marker: {lat: null, lng: null},
                mypolygons: {
                    par: null,
                    dun: null,
                    are: null,
                    dm: null,
                    zon: null
                },
                geojsons: {
                    par: null,
                    dun: null,
                    are: null,
                    dm: null,
                    zon: null
                },
                myinfo: {
                    par: {details: "PAR: P107", selected: false},
                    dun: {details: "DUN: N40", selected: false},
                    are: {details: "ARE: PJ", selected: false},
                    dm: {details: "DM: 107/40/15", selected: false},
                    zon: {details: "ZON: 1", selected: false}
                },
            }
        },
        ready () {
            // Terrible hack but it works :P
            self = this;
            // If hard coded starting point; no need to look up ..
            if (
                    !(this.mylat === null || this.mylat === undefined)
                    && !(this.mylng === null || this.mylng === undefined)
            ) {
                this.initGmaps();
            }
            // Only need to call if it is not hard coded already :P

            else {
                // Get User's location; call initGMaps once data is gathered ..
                // What about when it fails??
                Utils.findGeoLocation(this.initGmaps, this.location_marker)
            }
            // Init all the data from API backend?? Async??
            // Start with no query; leave that as default null ..
            // Utils.extractPolygon(self, "http://localhost:8080/api", this.geojsons)
        },
        methods: {
            callMe: function () {
                console.log("CALLME --> LAT: " + this.location_marker.lat + " LNG: " + this.location_marker.lng)
            },
            initGmaps: function () {
                // Check mapid is passed
                console.log("MAPID is " + self.mapid);
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
                        // console.log("Scenario #1: init process ... Lat is " + final_lat + " Lng is " + final_lng)

                    } else if (
                            !(this.location_marker.lat === null || this.location_marker.lat === undefined || this.location_marker.lat === "")
                            && !(this.location_marker.lng === null || this.location_marker.lng === undefined || this.location_marker.lng === "")

                    ) {
                        // console.log("Scenario #2: init process ... Lat is " + this.location_marker.lat +
                        //        " Lng is " + this.location_marker.lng)
                        final_lat = this.location_marker.lat;
                        final_lng = this.location_marker.lng;
                    } else {
                        console.log("Cannot init!")
                    }

                    // OK, now create the Map and Marker ...
                    let mymapmarker = Utils.setupMapMarker(self, final_lat, final_lng)
                    this.mymap = mymapmarker.map
                    this.mymarker = mymapmarker.marker
                    // console.log("initGMaps " + util.inspect(this.mymap))
                    //this.mymap = Utils.setupMap(self, final_lat, final_lng)
                    //this.mymarker = Utils.setupMarker(this.mymap, this.location_marker, final_lat, final_lng)

                } else {

                }
            },
            altGmaps: Utils.createGMaps,
            createAllMarkers: function () {

            },
            createAllPolygon: function () {
                // DEBUG: Need to use JSON.parse as it is actually string to beecome Object!!
                /*
                 console.log("INSIDE createAllPolygon" + typeof(this.geojsons.dm))
                 let mypaths = [[
                 [101.60783228433, 3.1357780341625],
                 [101.60664881278, 3.1337163181438],
                 [101.59642367101, 3.13517607569],
                 [101.59648804721, 3.1437188985063],
                 [101.59745063262, 3.1493284860166],
                 [101.59923798179, 3.1494915535193],
                 [101.60158407483, 3.1516742153268],
                 [101.6034509064, 3.1543874402995],
                 [101.60489195018, 3.1552577462054],
                 [101.60732691461, 3.155487459555],
                 [101.61531661519, 3.1555309115591],
                 [101.61531557584, 3.1554962658424],
                 [101.61515920603, 3.1529277896996],
                 [101.61604266931, 3.1512533673724],
                 [101.61736469786, 3.1502775229295],
                 [101.61202696819, 3.1469848169202],
                 [101.61080953739, 3.1450407921937],
                 [101.61103925099, 3.1413974736699],
                 [101.60966999306, 3.1379373415854],
                 [101.60783228433, 3.1357780341625]
                 ]];
                 mypaths = JSON.parse(this.geojsons.dm)
                 console.log("MYPATHS: " + typeof(mypaths))

                 this.mymap.drawPolygon({
                 paths: mypaths,
                 useGeoJSON: true,
                 strokeColor: '#ED2A40',
                 strokeOpacity: 1,
                 strokeWeight: 3,
                 fillColor: '#F25C6D',
                 fillOpacity: 0.7
                 });
                 */
                let mapit_url_called = "http://localhost:8080/api?myaction=location&lat="
                        + this.location_marker.lat + "&lng=" + this.location_marker.lng
                console.log("MAPIT URL: " + mapit_url_called)
                console.log("DM Polygon BEFORE:" + this.geojsons.dm)
                // Get the data now ...
                Utils.extractPolygon(
                        self, mapit_url_called, this.geojsons
                )

            }
        }
        // Need a method that runs on load??
    }
</script>