import request from "@/utils/request.js"


export default{
    getlist(){
        return request({
            url:'/supplier/list',
            method:'get'
        })
    },
    search(page,size,searchMap){
        return request({
            url:`/supplier/list/search/${page}/${size}`,
            method:"post",
            data:searchMap
        })
    },
    add(pojo){
        return request({
            url:'/supplier',
            method:"post",
            data:pojo
        })
    },
    getDataById(id){
        return request({
            url:`/supplier/${id}`,
            method:'get'
        })
    },
    updata(pojo){
        return request({
            url:`/supplier/${pojo.id}`,
            method:'put',
            data:pojo
        })
    },
    deleteData(id){
        return request({
            url:`/supplier/remove/${id}`,
            method:'delete'
        })
    }
}