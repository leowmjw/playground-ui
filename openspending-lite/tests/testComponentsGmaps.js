/**
 * Created by leow on 5/2/16.
 */
"use strict"

let util = require("util")

let Model = require('../src/components/GMaps/Model')
let Utils = require('../src/components/GMaps/Utils')

// DEBUG:
// console.log(util.inspect(Utils, {color: true}))

let p = Model.getGeoJSONByArea('P106')

p.then(function (value) {

    // DEBUG:
    // console.log("GEOJSON: ", util.inspect(value, {colors: true, showHidden: false, depth: null}))

    let coordinates = value[0].c[0]
    for (let latlng of coordinates) {
        // let mylat, mylng = latlng.split(",")
        // How to stub out google.maps via tape?
        let myloc = google.maps.LatLng(latlng)
        console.log("LAT: %s, LNG: %s", myloc.lat(), myloc.lng())
    }

}).catch(function (err) {
        console.error("ERR: ", err)
    }
)

