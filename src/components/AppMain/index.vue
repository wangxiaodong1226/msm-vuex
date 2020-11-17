<template>
  <div class="main">
    <link-app v-show ="$route.path!='/home'"></link-app>
    <router-view></router-view>
  </div>
</template>
<script>
import LinkApp from './link.vue'
export default {
    components:{
        LinkApp
    }
}
</script>
<style scoped>
    .el-breadcrumb{
        height: 10px;
        padding: 20px;
         border-radius: 4px;
         box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .link{
        border-left: 3px solid black;
        padding-left: 5px;
    }
</style>