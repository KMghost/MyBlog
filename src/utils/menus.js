import {getRequest} from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        return;
    }

    getRequest('/system/config/menu').then(data => {
        if (data) {
            // 格式化 Router
            let fmtRoutes = formatRoutes(data);
            // 添加到 router
            router.addRoutes(fmtRoutes);
            // 将数据存入 vuex
            store.commit('initRoutes', fmtRoutes);
        }
    })
}

export const formatRoutes = (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let {
            path,
            component,
            name,
            iconCls,
            children,
        } = router;
        /* 如果有 children 并且 children 是一个数组*/
        if (children && children instanceof Array) {
            /*递归*/
            children = formatRoutes(children);
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            children: children,
            /*使用懒加载的方式*/
            component(resolve) {
                if (component.startsWith('Home')) {
                    require(['../views/home/' + component + '.vue'], resolve);
                } else if (component.startsWith('Emp')) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith('Per')) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sal')) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sta')) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sys')) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                } else {
                    console.log('not match anything')
                }
            }
        }
        fmtRoutes.push(fmRouter)
    });
    return fmtRoutes;
}
