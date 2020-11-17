<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item class='link' :to="{ path: '$route.path' }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>