import axios from 'axios'
import {Message} from 'element-ui'
import router from '../router'
/* success:是成功请求后端接口 */
/*拦截器*/
axios.interceptors.response.use(success => {
    // 业务逻辑错误
    if (success.status && success.status == 200) {
        if (success.data.code == 500 || success.data.code == 401 || success.data.code == 403) {
            Message.error({message: success.data.message});
            return;
        }
        if (success.data.message) {
            Message.success({message: success.data.message})
        }
    }
    return success.data;
}, err => {
    if (err.response.code == 504 || err.response.code == 404) {
        Message.error({message: '服务器被吃了o(╯□╰)o！'});
    } else if (err.response.code == 403) {
        Message.error({message: '权限不足请联系管理员'});
        router.replace('/');
    } else {
        Message.error({message: err.response.data ? err.response.data : '发生未知错误'})
    }
    return;
})
