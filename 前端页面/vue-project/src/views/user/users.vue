<template>
  <el-container>
    <el-header><CommonHeader /></el-header>
    <el-container>
      <el-aside width="200px"><Aside /></el-aside>
      <el-main><RouterView /></el-main
    ></el-container>
  </el-container>
</template>
<script setup>
import Aside from "../../components/Aside.vue";
import CommonHeader from "@/components/CommonHeader.vue";
</script>
<style scoped lang="scss"></style>
