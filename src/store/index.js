import Vue from 'vue'
import Vuex from 'vuex'
import {getRequest} from "../utils/api";

Vue.use(Vuex);

const now = new Date();

const store = new Vuex.Store({
    // state 可以理解为一个全局对象，用来保存所有组件的公共数据
    state: {
        routes: [],
        // sessions是普通客户端使用，adminList是公司后台使用
        sessions: [{
            id: 1,
            user: {
                name: '示例介绍',
                img: 'http://localhost:8080/static/assets/images/2.png'
            },
            messages: [{
                content: 'Hello，这是一个基于Vue + Vuex + Webpack构建的简单chat示例，聊天记录保存在localStorge, 有什么问题可以通过Github Issue问我。',
                date: now
            }, {
                content: '项目地址(原作者): https://github.com/coffcer/vue-chat',
                date: now
            }, {
                content: '本项目地址(重构): https://github.com/is-liyiwei',
                date: now
            }, {
                content: '本项目地址(重构): https://github.com/is-liyiwei',
                date: now
            }, {
                content: '本项目地址(重构): https://github.com/is-liyiwei',
                date: now
            }]
        }, {
            id: 2,
            user: {
                name: 'webpack',
                img: 'http://localhost:8080/static/assets/images/3.jpg'
            },
            messages: [{
                content: 'Hi，我是webpack哦',
                date: now
            }]
        }],
        admins: [],
        currentSessionId: -1,
        filterKey: ''
    },
    // mutations 可以改变 state 中值的方法 (mutations是同步执行的 异步执行用 actions)
    mutations: {
        initRoutes(state, data) {
            state.routes = data;
        },
        changeCurrentSessionId(state, id) {
            state.currentSessionId = id;
        },
        addMessage(state, msg) {
            state.sessions[state.currentSessionId - 1].messages.push({
                content: msg,
                date: new Date(),
                self: true
            })
        },
        INIT_DATA(state) {
            /*浏览器本地的历史聊天记录 */
            // let data = localStorage.getItem('vue-chat-session');
            // //console.log(data)
            // if (data) {
            //     state.sessions = JSON.parse(data);
            // }
        },
        INIT_ADMINS(state, data) {
            state.admins = data;
            console.log("log:",state.admins)
        }
    },

    actions: {
        initData(context) {
            getRequest('/chat/admin').then(resp => {
                if (resp) {
                    context.commit('INIT_ADMINS', resp)
                }
            })
            /*调用store方法*/
            // context.commit('INIT_DATA')
        }
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})


export default store;
