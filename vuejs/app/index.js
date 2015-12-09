import Vue from 'vue';
import App from './app.vue';

new Vue({
    el: 'body',
    components: {
        app: App
    },
    data: {
        msg: 'Hello Vue.js!'
    }
})
