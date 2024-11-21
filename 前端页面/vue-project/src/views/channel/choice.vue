<template>
  <el-carousel :interval="5000" arrow="never" height="550px">
    <el-carousel-item v-for="(item, index) in rvideos" :key="index">
      <img :src="item.landscape" alt="video image" />
    </el-carousel-item>
  </el-carousel>
  <p style="margin: 20px 10px; font-size: 20px" v-if="isrevideo">
    根据你的喜好推荐
  </p>
  <div class="box">
    <div
      v-for="item4 in revideos"
      :key="item4.id"
      @click="navigateToVideo(item4.id)"
    >
      <img
        :src="item4.pic"
        alt="视频封面"
        style="height: 180px; width: 130px; object-fit: cover"
      />
      <p>{{ item4.title }}</p>
    </div>
  </div>
  <p style="margin: 20px 10px; font-size: 20px">电视剧</p>
  <div class="box">
    <div
      v-for="item1 in tvideo"
      :key="item1.id"
      @click="navigateToVideo(item1.id)"
    >
      <img
        :src="item1.pic"
        alt="视频封面"
        style="height: 180px; width: 130px; object-fit: cover"
      />
      <p>{{ item1.title }}</p>
    </div>
  </div>
  <p style="margin: 20px 10px; font-size: 20px">电影</p>
  <div class="box">
    <div
      v-for="item2 in mvideo"
      :key="item2.id"
      @click="navigateToVideo(item2.id)"
    >
      <img
        :src="item2.pic"
        alt="视频封面"
        style="height: 180px; width: 130px; object-fit: cover"
      />
      <p>{{ item2.title }}</p>
    </div>
  </div>
  <p style="margin: 20px 10px; font-size: 20px">动画</p>
  <div class="box">
    <div
      v-for="item3 in cvideo"
      :key="item3.id"
      @click="navigateToVideo(item3.id)"
    >
      <img
        :src="item3.pic"
        alt="视频封面"
        style="height: 180px; width: 130px; object-fit: cover"
      />
      <p>{{ item3.title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRouter } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const video = ref([]);
const videos = ref([]);
const rvideos = ref([]);
const tvideo = ref([]);
const mvideo = ref([]);
const cvideo = ref([]);
const isrevideo = ref(false);
const revideos = ref([]);
const getVideo = async () => {
  const response = await proxy.$api.getVideo();

  // 假设数据在 response.data 中
  video.value = response.data;

  // 使用 Set 去重并将结果存入 videos
  const uniqueTitles = new Set();
  videos.value = video.value.filter((item) => {
    if (!uniqueTitles.has(item.title)) {
      uniqueTitles.add(item.title);
      return true; // 保留该视频
    }
    return false; // 过滤掉重复标题的视频
  });
  rvideos.value = videos.value.slice(0, 5);

  if (videos.value.length > 0) {
    mvideo.value = videos.value.filter((item) => item.classify === "movie");
    mvideo.value = mvideo.value.slice(0, 12);
    tvideo.value = videos.value.filter((item) => item.classify === "tv");
    tvideo.value = tvideo.value.slice(0, 12);
    cvideo.value = videos.value.filter((item) => item.classify === "cartoon");
    cvideo.value = cvideo.value.slice(0, 12);
  } else {
    console.log("没有视频数据");
  }
};
const reVideos = async () => {
  const response = await proxy.$api.reVideos();
  revideos.value = response.data;
  isrevideo.value = revideos.value.length > 0;
};
const navigateToVideo = (id) => {
  router.push(`/player/${id}`);
};
onMounted(() => {
  getVideo();
  reVideos();
});
</script>

<style scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.box {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}
.box img {
  margin: 15px;
}
.box p {
  margin: 0 15px;
}
</style>
