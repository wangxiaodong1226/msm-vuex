import request from '@/utils/request.js'

export default{
    judgeOldPass(userID,password){
        return request({
            url:'/user/pwd',
            method:'post',
            data:{
                userID,
                password
            }
        })
    },
    judgeNewPass(userID,password){
        return request({
            url:'/user/pwd',
            method:'put',
            data:{
                userID,
                password
            }
        })
    }
}