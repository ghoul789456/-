<template>
  <el-container>
    <el-header><CommonHeader /></el-header>
    <el-container>
      <div style="width: 100%">
        <el-card
          v-for="item in news"
          :key="item.id"
          style="width: 90%; margin: 10px auto"
        >
          <span style="margin-left: 20px">{{ item.topic }}</span>
          <span style="margin-left: 10px; font-size: 11px">{{
            formatDate(item.date)
          }}</span>
          <p style="margin: 20px; font-size: 13px">{{ item.content }}</p>
        </el-card>
      </div></el-container
    ></el-container
  >
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import CommonHeader from "@/components/CommonHeader.vue";
const { proxy } = getCurrentInstance();
const news = ref([]);

const getNews = async () => {
  try {
    const response = await proxy.$api.getNews();
    news.value = response.data.reverse(); // 将新闻数据倒序排列
  } catch (error) {
    console.error("Error", error);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};

onMounted(() => {
  getNews();
});
</script>

<style scoped></style>
