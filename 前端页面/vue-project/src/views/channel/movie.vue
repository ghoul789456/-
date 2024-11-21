<template>
  <p>热播电影</p>
  <div class="videobox">
    <div
      class="video"
      v-for="item in videos"
      :key="item.id"
      @click="navigateToVideo(item.id)"
    >
      <!-- 使用 img 标签替代 image 标签 -->
      <img
        :src="item.pic"
        alt="视频封面"
        style="height: 180px; width: 130px; object-fit: cover"
      />
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router"; // 引入 useRouter

const { proxy } = getCurrentInstance();
const router = useRouter(); // 获取 router 实例
const videos = ref([]); // 初始化为空数组
const video = ref([]); // 需要初始化为数组

const getVideoclass = async () => {
  try {
    const classdata = {
      classify: "movie",
    };
    const response = await proxy.$api.getVideoclass(classdata);
    videos.value = response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};

const navigateToVideo = (id) => {
  router.push(`/player/${id}`); // 跳转到视频播放页面
};

onMounted(() => {
  getVideoclass();
});
</script>

<style scoped>
.videobox {
  display: flex;
  flex-wrap: wrap;
}
.video {
  height: auto;
  width: auto;
  margin: 20px;
}
</style>
