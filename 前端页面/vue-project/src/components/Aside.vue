<template>
  <div>
    <el-form class="usermenu">
      <el-form-item style="height: 100px">
        <span style="margin: 10px 10px 0 20px">
          <el-avatar :size="50" :src="picUrl"
        /></span>
        <p style="font-size: 20px">{{ nicknameUrl }}</p>
      </el-form-item>
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
import router from "@/router";
import avatarUrl from "../assets/logo/R.jpg";
import { ref, getCurrentInstance, onMounted, computed } from "vue";
const { proxy } = getCurrentInstance();
const user = ref({});
const menus = [
  {
    path: "/userinfo",
    name: "userinfo",
    label: "个人信息",
    icon: "User",
    url: "userpage/userinfo",
  },
  {
    path: "/history",
    name: "history",
    label: "观看历史",
    icon: "Clock",
    url: "userpage/history",
  },
  {
    path: "/collect",
    name: "collect",
    label: "收藏",
    icon: "Star",
    url: "userpage/collect",
  },
  {
    path: "/subscription",
    name: "subscription",
    label: "订阅",
    icon: "Bell",
    url: "userpage/subscription",
  },
];
const getUser = async () => {
  user.value = await proxy.$api.getUser();
  console.log(user.value);
};
//默认昵称
const nicknameUrl = computed(() => {
  return user.value.nickname ? user.value.nickname : "用户";
});
//默认头像
const picUrl = computed(() => {
  return user.value.pic ? user.value.pic : avatarUrl;
});

onMounted(() => {
  getUser();
});
</script>
<style scoped>
.usermenu {
  overflow-y: scroll;
  height: 100%;
}
.usermenu::-webkit-scrollbar {
  display: none;
}
</style>
