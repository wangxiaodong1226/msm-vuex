import request from '@/utils/request'

export default{
    getList(){
        return request({
            url:'/user/list',
            method:'get'
        })
    },
    search(page,size,searchMap){
        return request({
            url:`/member/list/search/${page}/${size}`,
            method:"post",
            data:searchMap
        })
    },
    add(memberMessage){
        return request({
            url:"/member",
            method:"post",
            data:memberMessage
        })
    },
    getDataById(id){
        return request({
            url:`/member/${id}`,
            method:"get"
        })
    },
    upData(pojo){
        return request({
            url:`/member/${pojo.id}`,
            method:"put",
            data:pojo
        })
    },
    deleteMember(id){
        return request({
            url:`/member/remove/${id}`,
            method:"delete"
        })
    }
}