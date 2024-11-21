<template>
  <p v-if="issubscription">订阅</p>
  <p v-else>暂无订阅记录</p>
  <div class="videobox">
    <div
      class="video"
      v-for="item in subscriptions"
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
const issubscription = ref(false);
const subscriptions = ref([]);

const getSubscription = async () => {
  try {
    const response = await proxy.$api.getSubscription();
    subscriptions.value = response.data;
    issubscription.value = subscriptions.value.length > 0;
  } catch (error) {
    etS;
    console.error("Error fetching subscriptions:", error);
  }
};
const navigateToVideo = (vid) => {
  router.push(`/player/${vid}`);
};
onMounted(() => {
  getSubscription();
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
