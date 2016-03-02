/**
 * Created by leow on 2/23/16.
 */
// Generic Utils library for use by the GMaps component??

let util = require('util');

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
            }, function(err) {
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
    }
}
