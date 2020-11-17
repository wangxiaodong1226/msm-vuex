import router from './router'
import {GiveToken} from '@/api/login'
import store from '@/store'

router.beforeEach((to,from,next) => {
    // const token = localStorage.getItem('msm-316-token');
    
    const token = store.state.user.token;
    if(!token){
       if(to.path != '/login'){
           next({path:'/login'});
       }else{
           next();
       }
    }else{
        if(to.path =='/login'){
            next();
        }else{
            // const user = localStorage.getItem('msm-316-user');
            const user = store.state.user.user
            if(user){
               next();
            }else{
                store.dispatch('GetUserInfo').then(response =>{
                    if(response.flag){
                        next();
                    }else{
                        next({path:'/login'})
                    }
                })
                // GiveToken(token).then(response => {
                //     const resT = response.data;
                //     if(resT.flag){
                //         localStorage.setItem('msm-316-user',JSON.stringify(resT.data));
                //         next();  
                //       }else{
                //           next({path:'/login'})
                //       }
                // })
            }
        }
    }
})