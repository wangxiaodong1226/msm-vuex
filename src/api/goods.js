import request from '@/utils/request'

export default{
    search(page,size,searchMap){
        return request({
            url:`/goods/list/search/${page}/${size}`,
            method:'post',
            data:searchMap
        })
    },
    add(pojo){
        return request({
            url:'/goods',
            method:'post',
            data:pojo
        })
    },
    getById(id){
        return request({
            url:`/goods/${id}`,
            method:'get'
        })
    },
    updata(pojo){
        return request({
            url:`/goods/${pojo.id}`,
            method:'put',
            data:pojo
        })
    },
    deleteGood(id){
        return request({
            url:`/goods/remove/${id}`,
            method:'delete'
        })
    }
}