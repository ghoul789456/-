<template>
  <div>
    <el-form class="managemenu">
      <el-menu
        active-text-color="#ffd04b"
        background-color="rgba(255,255,255,0)"
        text-color="black"
        router
      >
        <el-menu-item v-for="item in menus" :index="item.path" :key="item.path">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu></el-form
    >
  </div>
</template>
<script setup>
const menus = [
  {
    path: "/umanage",
    name: "umanage",
    label: "用户管理",
    url: "manage/umanage",
  },
  {
    path: "/sendmsg",
    name: "sendmsg",
    label: "发送消息",
    url: "manage/sendmsg",
  },
  {
    path: "/vmanage",
    name: "vmanage",
    label: "视频管理",
    url: "manage/vmanage",
  },
];
</script>
<style scoped>
.managemenu {
  overflow-y: scroll;
  height: 100%;
  position: fixed;
  z-index: 0;
  width: 200px;
  left: 0;
}
.managemenu::-webkit-scrollbar {
  display: none;
}
</style>
