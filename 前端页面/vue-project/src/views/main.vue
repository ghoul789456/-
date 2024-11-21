<template>
  <el-container>
    <el-header><CommonHeader /></el-header>
    <el-container>
      <el-aside width="200px"><AsideMenu /></el-aside>
      <el-main><RouterView /></el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import CommonHeader from "../components/CommonHeader.vue";
import AsideMenu from "../components/AsideMenu.vue";
</script>
<style scoped></style>
