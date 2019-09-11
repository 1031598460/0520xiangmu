import axios from 'axios'
import { message } from 'antd'
import store from "@redux/store"

//创建axios的实例

const eg=axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:5000
});

eg.interceptors.request.use(
    (post) => {
        const  { token } =store.getState().name;
        if (token){
            post.headers.authorization=token;
        }
        return post;
    }
);

eg.interceptors.response.use(
    (response) => {
        const result=response.data;
        if (result.status===0){
            return result.data;
        }else{
            message.error(result.msg);
            return Promise.reject(result.msg);
        }
    },
    (error) => {
        message.error('未知错误，请联系管理员~');
        return Promise.reject('未知错误，请联系管理员~');
    }
);

export default  eg;
