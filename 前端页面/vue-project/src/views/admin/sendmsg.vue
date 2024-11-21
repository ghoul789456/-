<template>
  <el-card style="width: 800px; margin: 40px auto">
    <h1>发送消息</h1>
    <el-form class="smsg">
      <el-form-item label="标题">
        <el-select v-model="selectedTopic" placeholder="请选择类型">
          <el-option label="维护通知" value="维护通知" />
          <el-option label="维护完成" value="维护完成" />
          <el-option label="系统升级" value="系统升级" />
          <el-option label="升级完成" value="升级完成" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="messageContent"
          rows="3"
          style="border-radius: 8px"
        />
      </el-form-item>
      <el-button :loading="loading" type="primary" @click="sendNews"
        >确定</el-button
      >
    </el-form></el-card
  >
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";

// 获取当前实例
const { proxy } = getCurrentInstance();

// 表单数据
const selectedTopic = ref(""); // 选中的标题
const messageContent = ref(""); // 输入的内容
const loading = ref(false); // 按钮的加载状态

// 发送消息的函数
const sendNews = async () => {
  // 验证表单是否为空
  if (!selectedTopic.value || !messageContent.value) {
    proxy.$message.error("标题和内容不能为空");
    return;
  }

  const news = {
    topic: selectedTopic.value,
    content: messageContent.value,
  };
  // 设置按钮为加载状态，防止重复提交
  loading.value = true;
  const response = await proxy.$api.sendMsg(news);
  if (response) {
    // 清空表单内容
    selectedTopic.value = "";
    messageContent.value = "";
  }
  // 无论成功或失败，重置加载状态
  loading.value = false;
};
</script>

<style scoped>
.smsg {
  width: 400px;
  margin: 20px auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  margin-top: 20px;
}
</style>
