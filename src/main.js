import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import {getRequest} from "./utils/api"
import {postRequest} from "./utils/api"
import {putRequest} from "./utils/api"
import {deleteRequest} from "./utils/api"
import {initMenu} from "./utils/menus";
import 'font-awesome/css/font-awesome.css'
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.deleteRequest = deleteRequest

Vue.use(VueAxios, axios)
Vue.use(ElementUI);
// 路由守卫
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('tokenStr')){
        initMenu(router, store)
        console.log('success')
        next();
    } else {
        if (to.path == '/'){
            next();
        }
    }
})
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
