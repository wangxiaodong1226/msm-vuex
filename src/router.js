import Vue from "vue";
import Router from "vue-router";
import login from "@/views/login/index.vue"
import layout from '@/components/layout.vue'
import Home from '@/views/home'
import Goods from '@/views/goods'
import Supplier from '@/views/supplier'
import Staff from '@/views/staff'
import Member from '@/views/member'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path:'/',
      name:"layout",
      component:layout,
      redirect:"/home",
      children:[
        {
          path:'/home',
          component:Home,
          meta:{title:"首页"}
        }
      ]
    },
    {
      path:'/goods',
      component:layout,
      children:[{
        path:"/",
        component:Goods,
        meta:{title:"商品管理"}
      }]
    },
  
    {
      path:'/member',
      component:layout,
      children:[{
        path:"/",
        component:Member,
        meta:{title:"会员管理"}
      }]
    },
   
    {
      path:'/staff',
      component:layout,
      children:[{
        path:"/",
        component:Staff,
        meta:{title:"员工管理"}
      }]
    },
    {
      path:'/supplier',
      component:layout,
      children:[{
        path:"/",
        component:Supplier,
        meta:{title:"供应商管理"}
      }]
    }
   
  ]
});
