<template>
  <p v-if="iscollection">收藏</p>
  <p v-else>暂无收藏记录</p>
  <div class="videobox">
    <div
      class="video"
      v-for="item in collections"
      :key="item.id"
      @click="navigateToVideo(item.vid)"
    >
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
const iscollection = ref(false);
const collections = ref([]);

const getCollection = async () => {
  try {
    const response = await proxy.$api.getCollection();
    collections.value = response.data;
    iscollection.value = collections.value.length > 0;
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
const navigateToVideo = (vid) => {
  router.push(`/player/${vid}`);
};
onMounted(() => {
  getCollection();
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
