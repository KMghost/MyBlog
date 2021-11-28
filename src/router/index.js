import Vue from "vue";
import Router from "vue-router";
import Login from "../views/Login/Login";
import Home from "../views/Home/Home";
import test1 from "../views/test1";
import test2 from "../views/test2";

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
            component: Home,
            children: [{
                path: '/test1',
                name: 'test1',
                component: test1
            },
                {
                    path: '/test2',
                    name: 'test2',
                    component: test2
                }]
        }
    ]
})
