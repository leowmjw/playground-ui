// Get the global Bootstrap CSS in??
// require('./assets/docs.css');
// require('./assets/style.css');
// require('./bsdist/css/bootstrap.css');
// require('./bsdist/css/bootstrap-theme.css');
// require('./assets/prism-coy.css')
require('./assets/dashboard.css');

import Vue from 'vue'
import App from './App.vue'
// import voterSearchBar from './components/voterSearchBar.vue';

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
    }
})
