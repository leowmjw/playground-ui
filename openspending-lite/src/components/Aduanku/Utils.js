/**
 * Created by leow on 5/12/16.
 */
"use strict"
import util from 'util'

const request = require('superagent-promise')(require('superagent'), Promise)

function _whichPARIsPointIn(point) {
    // What if there is no lat,long??
    /*
     $sinar_mapit_base_url = "http://mapit.sinarproject.org/point/4326/";
     $sinar_mapit_url = $sinar_mapit_base_url . $lng . "," . $lat;

     http://mapit.sinarproject.org/point/4326/101.564661,3.056455?type=PAR
     http://mapit.sinarproject.org/point/4326/101.564661,3.056455
     */

    // http://mapit.sinarproject.org/point/4326/101.564661,3.056455?type=PAR
    const lat = point.lat[0]
    const lng = point.long[0]
    // DEBUG:
    // console.error("URL:", `http://mapit.sinarproject.org/point/4326/${lng},${lat}?type=PAR`)
    /*
     Output looks like:
     {
     "7199": {
     "parent_area": null,
     "generation_high": 1,
     "all_names": {},
     "id": 7199,
     "codes": {
     "code": "P108"
     },
     "name": "P108",
     "country": "M",
     "type_name": "Parliament",
     "generation_low": 1,
     "country_name": "Malaysia",
     "type": "PAR"
     }
     }
     */
    // for each item of results
    // retrieve the "name"; correct should be to use codes.code ..
    // What about ID??
    return new Promise(function (resolve, reject) {
        // try to use the new fetch function instead of superagent??
        request
            .get(`http://mapit.sinarproject.org/point/4326/${lng},${lat}`)
            .query({type: "PAR"})
            .then(
                (res) => {
                    // DEBUG:
                    // console.error(util.inspect(res))
                    if (res.ok) {
                        // DEBUG:
                        // console.error("JSON:", util.inspect(res.body))
                        const payload = res.body
                        // console.error("Set: %s TYPE: %s", util.inspect(payload), typeof(payload))
                        for (const key of Object.keys(payload)) {
                            // Pick off the first item only!
                            // console.error("KEY: %s VAL: %s", key, util.inspect(payload[key]))
                            // console.error("AREA_ID:", payload[key].name)
                            resolve(payload[key].name)
                        }
                    } else {
                        // Check other results??
                        console.error("TYPE:", res.resultType)
                        // reject(res.statusCode)
                    }
                }
            )
    })

}

export default {
    getLocation: function (data) {
        // Description: data is lat,lng; update the view state
        // Needs to be binded at the top level to get the correct context
        // DEBUG:
        // console.error("LAT: %s LNG: %s", data.lat[0], data.long[0])
        const p = _whichPARIsPointIn(data)
        // Get out the area ID from here ...
        // Further checks to make sure it is not empty?? .. maybe ..
        p.then(
            function (value) {
                // All OK; then update the internal View Status
                this.current_issue_location.lat = data.lat[0]
                this.current_issue_location.lng = data.long[0]
                // should trigger the $watch for lat ..
                // OK; value == Area ID
                // console.error("AduankuVAL:", value)
                this.selectedarea = value
            }.bind(this)
        ).catch(
            function (err) {
                console.error(util.inspect(err))
            }
        )
    },
    whichAuthorityIsPointIn: function (point) {
        // TODO: Adapt from https://github.com/maxogden/geojson-js-utils; as it is no longer supoprted
        // Cycle through known Authority; highest number of issues first??
        // Individual PBT GeoJSON are as per below:
        // https://github.com/TindakMalaysia/Selangor-Maps/tree/master/Selangor%202013%20PBT/PBT
        // Can load into ArangoDB?
    },
    whichElectoralIsPointIn: function (point) {

    },
    whichPARIsPointIn: _whichPARIsPointIn,
    whichDUNUIsPointIn: function (point) {
        // http://mapit.sinarproject.org/point/4326/101.564661,3.056455?type=DUN

    },
    whichZONIsPointIn: function (point) {
        // http://mapit.sinarproject.org/point/4326/101.564661,3.056455?type=ZON

    }
}