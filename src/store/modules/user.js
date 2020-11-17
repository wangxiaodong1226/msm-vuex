import { getToken, setToken, getUser, setUser, removeToken } from '@/utils/auth.js'
import { LoginTrue, GiveToken,SendStoken } from '@/api/login.js'

const user = {
    state: {
        user: getUser(),
        token: getToken()
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setToken(token);
        },
        SET_USER(state, user) {
            state.user = user;
            setUser(user);
        }
    },
    actions: {
        Login({ commit }, form) {
            return new Promise((resolve, reject) => {
                LoginTrue(form.username, form.password).then(response => {
                    const resp = response.data;
                    commit('SET_TOKEN', resp.data.token);
                    resolve(resp)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetUserInfo({commit,state}){
            return new Promise((resolve,reject) => {
                GiveToken(state.token).then(response =>{
                    const resp = response.data;
                    commit('SET_USER',resp.data);
                    resolve(resp)
                }).catch(error =>{
                    reject(error)
                })
            })
        },
        LogoOut({commit,state}){
            return new Promise((resolve,reject) => {
                SendStoken(state.token).then(response =>{
                    const resp = response.data;
                    commit('SET_TOKEN',null);
                    commit('SET_USER',null);
                    removeToken();
                    resolve(resp);
                }).catch(error =>{
                    reject(error);
                })
            })
        }
    }
}

export default user