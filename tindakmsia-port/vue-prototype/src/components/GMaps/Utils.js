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
    findGeoLocation () {
        // Init variables
        let mylat = null;
        let mylng = null;

        // Check if it exists

        // If NOT; or error or not allowed; use a default lat,lng??

        // Get the data fill into the data structure; or maybe return the data structure

        return {
            current_lat: mylat,
            current_lng: mylng
        }
    }
}
