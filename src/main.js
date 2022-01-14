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
Vue.use(ElementUI,{size:"small"});
// 路由守卫
router.beforeEach((to, from, next) => {
    if (window.sessionStorage.getItem('tokenStr')) {
        initMenu(router, store)
        if (!window.sessionStorage.getItem('user')) {
            return getRequest('/admin/info').then(resp=>{
                // 判断用户信息是否存在
                if (resp) {
                    // 存入用户信息
                    window.sessionStorage.setItem('user', JSON.stringify(resp))
                    next();
                }
            })
        }
        next();
    } else {
        if (to.path == '/') {
            next();
        }else{
            next('/?redirect='+to.path)
        }
    }
})
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
