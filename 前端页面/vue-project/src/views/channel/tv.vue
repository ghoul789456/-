<template>
  <p>热播电视剧</p>
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
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const router = useRouter();
const videos = ref([]);

const getVideoclass = async () => {
  try {
    const classdata = {
      classify: "tv",
    };
    const response = await proxy.$api.getVideoclass(classdata);
    videos.value = response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
};
const navigateToVideo = (id) => {
  router.push(`/player/${id}`);
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
