import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";

Vue.use(Router)

export default new Router({
    mode: 'history',  // mode两种模式 hash是路径带#的，mode是路径不带#的
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        }
    ]
})
