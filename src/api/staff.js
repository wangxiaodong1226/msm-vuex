import request from '@/utils/request'

export default{
    search(page,size,searchMap){
        return request({
            url:`/staff/list/search/${page}/${size}`,
            method:'post',
            data:searchMap
        })
    },
    add(pojo){
        return request({
            url:'staff',
            method:'post',
            data:pojo
        })
    },
    getById(id){
        return request({
            url:`staff/${id}`,
            method:'get'
        })
    },
    upData(pojo){
        return request({
            url:`staff/${pojo.id}`,
            method:'put',
            data:pojo
        })
    },
    deleteData(id){
        return request({
            url:`/staff/remove/${id}`,
            method:'delete'
        })
    }
}