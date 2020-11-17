import request from '@/utils/request'

export function LoginTrue(name,password) {
    return request({
        url:'/user/login',
        method:'post',
        data(){
            name,
            password
        }
    })
}

export function GiveToken(token) {
    return request({
        url:`/user/info/${token}`,
        method:'get'
    })
}

export function SendStoken(token) {
    return request({
        url:'/user/logout',
        method:'get',
        data:{
            token
        }
    })
}