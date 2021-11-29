import Vue from "vue";
import Router from "vue-router";
import Login from "../views/login/Login";
import Home from "../views/home/Home";
import test1 from "../views/test1";
import test2 from "../views/test2";

Vue.use(Router)
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden:true
    },
    {
        path: '/home',
        name: '导航一',
        component: Home,
        children: [{
            path: '/test1',
            name: '选项一',
            component: test1
        },
            {
                path: '/test2',
                name: '选项二',
                component: test2
            }]
    }
]

export default new Router({
    mode: 'history',  // mode两种模式 hash是路径带#的，mode是路径不带#的
    routes: routes
})
