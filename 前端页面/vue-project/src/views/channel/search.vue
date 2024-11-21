<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部" name="first">
      <div class="vbox" v-for="item in videoEpisodes" :key="item.id">
        <el-image :src="item.pic" alt="视频封面" />
        <div class="video-info">
          <div style="height: 170px; width: 500px">
            <p class="video-title">{{ item.title }}</p>
            <p class="video-description" :class="{ expanded: isExpanded }">
              简介：{{ item.description }}
            </p>
            <span @click="toggleExpand" style="font-size: 12px">{{
              isExpanded ? "收起" : "展开"
            }}</span>
          </div>
          <el-button @click="playVideo(item.id)">立即播放</el-button>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const route = useRoute();
const router = useRouter();
const videoEpisodes = ref([]);

const activeName = ref("first"); // 激活的标签名
// 控制简介的展开/收起
const isExpanded = ref(false);
// 切换展开/收起状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
const searchVideo = async () => {
  const searchdata = {
    title: decodeURIComponent(route.query.q),
  };
  const res = await proxy.$api.searchVideo(searchdata);
  videoEpisodes.value = res;
};
// 播放视频的函数
const playVideo = (id) => {
  router.push(`player/${id}`);
};
onMounted(() => {
  searchVideo();
});
</script>

<style scoped>
.vbox {
  display: flex;
  margin-bottom: 20px;
}
.el-image {
  width: 150px;
  height: 200px;
}
.video-info {
  margin: 0 20px;
}

.video-title {
  font-weight: bold;
  font-size: 16px;
  margin: 0 0 10px 0;
}

.video-description {
  display: inline-block;
  margin: 0 20px 0 0;
  font-size: 12px;
  width: auto;
  height: 30px; /* 限制高度为30px */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: normal;
  transition: height 0.3s ease; /* 添加过渡效果 */
}
.expanded {
  height: auto; /* 当展开时，移除高度限制 */
  overflow: visible; /* 展开时显示所有内容 */
}
</style>
