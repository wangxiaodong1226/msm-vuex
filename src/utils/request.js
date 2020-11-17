import axios from "axios";
import { Loading, Message } from 'element-ui';
const request = axios.create({
    baseURL:"http://localhost:7300/mock/5f9e2df02326091ab86c5ef9",
    timeout:5000
})
const loading = {
    loadingInstance: null,
    open:function () {
       if(this.loadingInstance ==null){
        this.loadingInstance = Loading.service({
            text:'拼命加载中...',
            target:'.main',
            backgroud:'rgba(0, 0, 0, 0.5)'
        });
       }
   },
   close:function(){
       if(this.loadingInstance != null){
           this.loadingInstance.close();
       }
       this.loadingInstance =null;
   }

   
}
request.interceptors.request.use(config => {
    loading.open() // 打开加载效果
    return config
}, error => {
    // 出现异常
    loading.close() // 关闭加载效果
    return Promise.reject(error);
})
// 响应拦截器
request.interceptors.response.use(response => {
    loading.close() // 关闭加载效果
    const resp = response.data;
    if(resp.code !== 2000){
        Message({
            message:resp.message || '系统异常',
            type:'warning',
            duration:5000
        })
    }
    return response
}, error => {
    loading.close() // 关闭加载效果
    Message({
        message:error.message,
        type:'error',
        duration:5000
    })
    return Promise.reject(error);
})
export default request