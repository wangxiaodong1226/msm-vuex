<template>
  <div>
     <app-header></app-header>
     <navbar></navbar>
    <app-main></app-main>
   
  </div>
    
</template>
<script>
import AppHeader from './AppHeader'
import navbar from './AppNavbar'
import AppMain from './AppMain'
export default {
    components:{
        AppHeader,
        navbar,
        AppMain
    }
}
</script>
<style >
    .header{
        position: absolute;
        line-height: 50px;
        top: 0;
        left: 0;
        right: 0;
        background-color: #2d3a4b;
    }
    .left{
        position: absolute;
        top: 50px;
        left: 0;
        bottom: 0;
        width: 200px;
        background-color: rgb(84,92,100);
    }
    .main{
        position: absolute;
        top: 50px;
        left: 200px;
        right: 0;
        bottom: 0;
        padding: 20px;
    }
</style>