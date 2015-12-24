/**
 * Created by leow on 12/23/15.
 */

/*
    Put data structure of all the state needed for the EC App
    // IC Number
    // Postcode
    // Address
    // GMaps Filter state
        props: point, layers
    // EC Details Filter state
    // Mapit Filter state

 */

import Vue from 'vue';

Vue({
    data: {
        ic: "",
        postcode: "",
        address: "",
        lat: "",
        lng: "",
        filter: {
            ec: true,
            mapit: true
        },
        layers: {
            ec: {
                par: true,
                dun: true,
                dm: true
            },
            mapit: {
                par: true,
                dun: true,
                dm: true
            }
        }
    }
})