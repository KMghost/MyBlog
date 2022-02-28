import Vue from "vue";
import Router from "vue-router";
import Login from "../views/login/Login";
import FriendChat from "../views/chat/FriendChat";
import Home from "../views/home/Home";

Vue.use(Router)
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        hidden:true
    },{
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/chat',
                name: 'Chat',
                component: FriendChat
            }
        ]
    }
]

export default new Router({
    mode: 'history',  // mode两种模式 hash是路径带#的，mode是路径不带#的
    routes: routes
})
