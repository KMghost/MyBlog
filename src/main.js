import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import { getRequest } from "./utils/api"
import { postRequest } from "./utils/api"
import { putRequest } from "./utils/api"
import { deleteRequest } from "./utils/api"

Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest

Vue.use(VueAxios, axios)
Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
