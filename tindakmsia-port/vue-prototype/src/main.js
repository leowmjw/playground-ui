// Get the global Bootstrap CSS in??
// require('./assets/docs.css');
// require('./assets/style.css');
// require('./bsdist/css/bootstrap.css');
// require('./bsdist/css/bootstrap-theme.css');
// require('./assets/prism-coy.css')
// Refactored below into the App, and all the other related components :P
// require('./assets/dashboard.css');

import Vue from 'vue'
import App from './App.vue'
// import voterSearchBar from './components/voterSearchBar.vue';

// Test out custom directive

// Test out custom filter ..

new Vue({
    el: 'body',
    components: {
        App
    },
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
    },
    computed: function() {

    },
    ready: function() {

    },
    methods: function() {

    }
})
