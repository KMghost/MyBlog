import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    // state 可以理解为一个全局对象，用来保存所有组件的公共数据
    state: {
        routes: []
    },
    // mutations 可以改变 state 中值的方法 (mutations是同步执行的 异步执行用 actions)
    mutations: {
        initRoutes(state, data) {

        }
    }
})
