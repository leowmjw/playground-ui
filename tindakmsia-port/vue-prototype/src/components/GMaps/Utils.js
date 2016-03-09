/**
 * Created by leow on 2/23/16.
 */
// Generic Utils library for use by the GMaps component??

let util = require('util');
let req = require('superagent')

function bob() {
    console.log("I am in BOB!!!")
}

export default {

    setupMapMarker: function (self, final_lat, final_lng) {
        let mymap;
        let mymarker;
        console.log("MAPID_INSIDE is " + self.mapid);

        mymap = new GMaps({
            div: '#map-' + self.mapid,
            lat: final_lat,
            lng: final_lng,
            dragend: function (e) {
                let lat = e.getCenter().lat();
                let lng = e.getCenter().lng();
                console.log("Lat: " + lat + " Lng: " + lng);
                self.location_marker.lat = lat
                self.location_marker.lng = lng
                self.callMe()
            }
        });

        mymarker = mymap.addMarker({
            lat: final_lat,
            lng: final_lng,
            title: 'Voter\'s Location',
            draggable: true,
            dragend: function (e) {
                // Debug
                // console.log(util.inspect(e, { showHidden: true, depth: null }))
                let lat = e.latLng.lat();
                let lng = e.latLng.lng();
                self.location_marker.lat = lat
                self.location_marker.lng = lng
                console.log("Centering on .. Lat: " + lat + " Lng: " + lng);
                mymap.setCenter(lat, lng)
            },
            click: function (e) {
                alert('You clicked in this marker' + e.toString());
            }

        });

        self.callMe();

        return {map: mymap, marker: mymarker}
    },
    setupMap: function (self, final_lat, final_lng) {
        let mymap;

        mymap = new GMaps({
            div: '#map',
            lat: final_lat,
            lng: final_lng,
            dragend: function (e) {
                let lat = e.getCenter().lat();
                let lng = e.getCenter().lng();
                console.log("Lat: " + lat + " Lng: " + lng);
                self.location_marker.lat = lat
                self.location_marker.lng = lng
                self.callMe()
            }
        });

        self.callMe();

        return mymap;
    },
    setupMarker: function (mymap, location_marker, final_lat, final_lng) {
        let mymarker;
        mymarker = mymap.addMarker({
            lat: final_lat,
            lng: final_lng,
            title: 'Voter\'s Location',
            draggable: true,
            dragend: function (e) {
                // Debug
                // console.log(util.inspect(e, { showHidden: true, depth: null }))
                let lat = e.latLng.lat();
                let lng = e.latLng.lng();
                console.log("Lat: " + lat + " Lng: " + lng);
                location_marker.lat = lat
                location_marker.lng = lng
            },
            click: function (e) {
                alert('You clicked in this marker' + e.toString());
            }

        });
        return mymarker;
    },
    refreshGeoLocation (callThisWhenHavePosition, location_marker, mylat = null, mylng = null) {

        // Have those graphics to click to reestablish location ...
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                // Get the detail as needed
                location_marker.lat = position.coords.latitude
                location_marker.lng = position.coords.longitude
                console.log("INSIDE: GOT a location! Lat: " + mylat + " Lng: " + mylng)
                // Since this is async; need to wait until then to pull this off
                // Maybe better a Promise type or yield solution??
                // This is tied deeply but OK ler ...
                if (!(callThisWhenHavePosition === null)) {
                    callThisWhenHavePosition()
                }
            }, function (err) {
                console.log("ERR: " + err.message + " Using default ..")
                location_marker.lat = mylat;
                location_marker.lng = mylng;
                if (!(callThisWhenHavePosition === null)) {
                    callThisWhenHavePosition()
                }
            })
        } else {
            // DO nothing ... just quit with null??
        }
    },
    findGeoLocation (callThisWhenHavePosition, location_marker) {
        // As a further exercise; convert this to a generator type solution with yield
        // as getCurrentPosition is actually async ... hmmm ...
        // For now; use the ugly solution
        // Init variables; default values filled ..
        let mylat = "3.079";
        let mylng = "101.468";

        // It will need to handle itself; but passes a default ..
        this.refreshGeoLocation(callThisWhenHavePosition, location_marker, mylat, mylng);
    },
    extractPolygon (api_url, geojsons, query = null) {
        // Call to back end; synchronous for now ..
        // Need to pass in some kind of inputs; and setup the fence to be triggered when it is exceeded
        console.log("Inside extractPolygon!")
        req.get(api_url)
            .end((err, res) => {

                // util.inspect(res.txt, { colors: true })
                if (err || !res.ok) {
                    console.log('Oh no! error MSG: ' + err.message);
                    console.log(util.inspect(res))
                } else {
                    // Alternative
                    // console.log("STRINGIFY: " + JSON.stringify(res.text))
                    /*
                     util.inspect(
                     JSON.parse(res.text),
                     {
                     colors: true
                     })
                     */
                    let geojsons_map = JSON.parse(res.text)
                    // DEBUG:
                    // console.log(util.inspect(geojsons_map) )

                    /*
                     console.log("PAR" + geojsons_map["par"])
                     console.log("DUN" + geojsons_map["dun"])
                     console.log("ARE" + geojsons_map["are"])
                     console.log("DM" + geojsons_map["dm"])
                     console.log("ZON" + geojsons_map["zon"])
                     */
                    // geojsons = Array.from(geojsons_map);

                    geojsons.par = geojsons_map["par"].length ? geojsons_map["par"] : null;
                    geojsons.dun = geojsons_map["dun"].length ? geojsons_map["dun"] : null;
                    // DEBUG:
                    // console.log("ARE size: " + geojsons_map["are"].length)
                    geojsons.are = geojsons_map["are"].length ? geojsons_map["are"] : null;
                    geojsons.dm = geojsons_map["dm"].length ? geojsons_map["dm"] : null;

                    // DEBUG:
                    /*
                     console.log(
                     util.inspect(JSON.parse(geojsons.dm))
                     )
                     */
                    // console.log("DM is of type " + typeof(geojsons.dm) + geojsons.dm)
                    // Async; so no return type :(
                    // callThisWhenHavePolygons()
                    /*
                     for (let k of Object.keys(myjson)) {
                     console.log("Item key " + k + " is " + myjson[k])
                     }
                     */
                }
            })
        // What happens when just the whole object is replaced; does it still become reactive??
    },
    renderPolygon (mymap, polygon_geojson, options) {
        // Attach; should the older one be removed first??
        // What would happen when it is replaced??
        // options are like the color; the opacity??
        let new_polygon_properties = Object.assign({
            paths: JSON.parse(polygon_geojson),
            useGeoJSON: true
        }, options)
        return mymap.drawPolygon(new_polygon_properties)

    }
}
