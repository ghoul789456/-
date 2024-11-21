<template>
  <el-form>
    <div class="sidebar">
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
      </el-menu>
    </div>
  </el-form>
</template>

<script setup>
const menus = [
  {
    path: "/choice",
    name: "choice",
    label: "首页",
    icon: "house",
    url: "channel/choice",
  },
  {
    path: "/tv",
    name: "tv",
    label: "电视剧",
    icon: "VideoCamera",
    url: "channel/tv",
  },
  {
    path: "/movie",
    name: "movie",
    label: "电影",
    icon: "film",
    url: "channel/movie",
  },
  {
    path: "/study",
    name: "study",
    label: "学习",
    icon: "EditPen",
    url: "channel/study",
  },
  {
    path: "/cartoon",
    name: "cartoo",
    label: "动漫",
    icon: "PictureRounded",
    url: "channel/cartoo",
  },
];
</script>

<style scoped>
.sidebar {
  position: fixed;
  z-index: 0;
  height: 100%;
  left: 0;
  width: 200px; /* 根据需要调整宽度 */

  background-color: #fff; /* 可以修改为你需要的背景颜色 */
  overflow-y: auto; /* 如果菜单项过多时，可以滚动 */
}
</style>
