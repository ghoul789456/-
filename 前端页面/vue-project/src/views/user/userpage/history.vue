<template>
  <div v-if="ishistory">
    <el-timeline style="margin: 20px">
      <el-timeline-item
        v-for="item in histories.filter((h) => !h.isOlderThanSevenDays)"
        :key="item.id"
        :timestamp="item.formattedDate"
        placement="top"
      >
        <img
          :src="item.pic"
          @click="navigateToVideo(item.vid)"
          alt="视频封面"
          style="height: 180px; width: 130px; object-fit: cover"
        />
        <p>{{ item.title }}</p>
      </el-timeline-item>
    </el-timeline>

    <p>七天前</p>
    <div style="margin: 20px; display: flex; flex-wrap: wrap">
      <div
        v-for="item in histories.filter((h) => h.isOlderThanSevenDays)"
        :key="item.id"
        style="margin: 10px"
      >
        <img
          :src="item.pic"
          @click="navigateToVideo(item.vid)"
          alt="视频封面"
          style="height: 180px; width: 130px; object-fit: cover"
        />
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
  <div v-else>暂无观看记录</div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const router = useRouter();
const histories = ref([]);
const ishistory = ref(false);

const getHistory = async () => {
  try {
    const response = await proxy.$api.getHistory();
    if (response.data && Array.isArray(response.data)) {
      const currentDate = new Date();
      histories.value = response.data.map((item) => {
        const date = new Date(item.date);
        return {
          ...item,
          formattedDate: date
            .toLocaleString("zh-CN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-"),
          isOlderThanSevenDays: currentDate - date > 7 * 24 * 60 * 60 * 1000, // 7天的毫秒数
        };
      });

      // 排序
      histories.value.sort((a, b) => new Date(b.date) - new Date(a.date));
      ishistory.value = histories.value.length > 0;
    } else {
      console.error("Response data is not valid:", response.data);
    }
  } catch (error) {
    console.error("Error fetching histories:", error);
  }
};

const navigateToVideo = (vid) => {
  router.push(`/player/${vid}`);
};

onMounted(() => {
  getHistory();
});
</script>

<style scoped></style>
