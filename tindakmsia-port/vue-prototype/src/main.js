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
