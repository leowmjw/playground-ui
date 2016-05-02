<style>
    .row {
        margin: 24px;
    }

    .popin {
        background: #fff;
        padding: 15px;
        box-shadow: 0 0 20px #999;
        border-radius: 2px;
    }

    .map,
    #panorama {
        height: 300px;
        background: #6699cc;
    }


</style>

<template>

    <div class="row">
        <div>
            <!--
            <div class="placeholder">
                <input type="text" v-model="searcharea"
                       @change="displayAreaByID | debounce 300"
                       placeholder="Display Map of Area by ID (P001, P222) .."
                       disabled
                >
            </div>
            -->
            <div>
                <div class="row">
                    <!--
                    Lat: {{ location_marker.lat }},
                    Lng: {{ location_marker.lng }}<br/>
                    -->
                    <showtheway :mylat="location_marker.lat" :mylng="location_marker.lng"></showtheway>
                </div>
            </div>
        </div>
        <div class="span11">
            <div class="popin">
                <div id="map-{{ mapid }}" class="map"></div>
            </div>
        </div>
    </div>


</template>

<script>

    let util = require('util')
    let Utils = require('./GMaps/Utils.js')
    let Model = require('./GMaps/Model.js')

    import ShowTheWay from './ShowTheWay.vue'

    export default {
        props: ['searcharea', 'selectedarea', 'mylat', 'mylng', 'mapid'],
        components: {
            showtheway: ShowTheWay
        },
        data () {
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
                    par: "BOB",
                    dun: null,
                    are: null,
                    dm: null,
                    zon: null
                },
                arangodb: null
            }
        },
        watch: {
            'selectedarea': function (val) {
                // DEBUG:
                console.error('new: %s', val)
                let p = Model.getGeoJSONByArea(val)
                // NOTE: Below is valid ES6 even though IntelliJ does not acknoledge it is so :P
                p.then(function (value) {
                    // DEBUG:
                    console.error("GeoJSON: ", value)
                    console.error("*****CHECK******: ", JSON.stringify(this.geojsons.par))
                    this.geojsons.par = value[0].c
                    if (this.geojsons.par == null) {
                        console.error("NO Valid Shapefile; do nothing ...")
                    } else {
                        // If pointer exist; must be removed first ..
                        // after confirm that NEW polygon exists!
                        if (this.mypolygons.par == null) {
                            console.error("NEW: Creating ...")
                        } else {
                            console.error("EXISTS: Removing ... ", this.geojsons.par)
                            // use setMap to null
                            this.mypolygons.par.setMap(null)
                        }
                        // DEBUG:
                        // console.error("AFTER: ", JSON.stringify(this.geojsons.par))
                        let new_polygon_properties = Utils.refocusSelectedArea(this.geojsons.par)
                        console.error("New POLYGON: ", new_polygon_properties)
                        this.mypolygons.par = this.mymap.drawPolygon(new_polygon_properties)
                    }
                }.bind(this))
            }
        },
        ready () {
            // DEBUG:
            // console.error("READY in GMaps!!")

            // if got mylat/mylng; do something??
            // If hard coded starting point; no need to look up ..
            if (!(this.mylat === null || this.mylat === undefined)
                    && !(this.mylng === null || this.mylng === undefined)) {
                this.location_marker.lat = this.mylat
                this.location_marker.lng = this.mylng
                Utils.initGmaps.call(this)
            }
            // Only need to call if it is not hard coded already :P
            else {
                // Get User's location; call initGMaps once data is gathered ..
                // What about when it fails??
                Utils.findGeoLocation.call(this)
            }

            // FInished testing ..
            // Model.testResolvePromise()
        },
        methods: {
            displayAreaByID: function () {
                console.log("Fetch Maps for Area ID: ", this.searcharea)
            }
        },
        computed: function () {

        }

    }
</script>