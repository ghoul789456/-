<template>
  <el-button @click="addVideo">添加</el-button>
  <el-table
    :data="tableData"
    border
    style="width: 1100px; margin: 10px auto; z-index: 0"
  >
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="title" label="视频标题" width="180" />
    <el-table-column
      prop="video_url"
      show-overflow-tooltip
      label="视频地址"
      width="180"
    />
    <el-table-column
      prop="description"
      show-overflow-tooltip
      label="视频简介"
    />
    <el-table-column prop="pic" show-overflow-tooltip label="展示图" />
    <el-table-column
      prop="landscape"
      show-overflow-tooltip
      label="横向展示图"
    />
    <el-table-column prop="classify" label="视频类型" width="180" />
    <el-table-column width="180">
      <template #default="scope">
        <el-button @click="delVideo(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="DialogVisible" title="添加视频" width="500" align-center>
    <p>视频标题:</p>
    <el-input
      style="margin: 10px; width: 450px"
      placeholder="请输入视频标题"
      v-model="inputTitle"
    />
    <p>视频地址:</p>
    <el-input
      style="margin: 10px; width: 450px"
      placeholder="请输入视频地址"
      v-model="inputVideoUrl"
    />
    <p>视频简介:</p>
    <el-input
      style="margin: 10px; width: 450px"
      placeholder="请输入视频简介"
      v-model="inputDescription"
    />
    <p>视频展示图:</p>
    <el-input
      style="margin: 10px; width: 450px"
      placeholder="请输入视频展示图"
      v-model="inputPic"
    />
    <p>横向图:</p>
    <el-input
      style="margin: 10px; width: 450px"
      placeholder="请输入视频横向图"
      v-model="inputLandscape"
    />
    <p>类型:</p>
    <el-select
      v-model="inputClassify"
      placeholder="请选择类型"
      style="margin: 10px; width: 450px"
    >
      <el-option label="电视剧" value="tv" />
      <el-option label="电影" value="movie" />
      <el-option label="动漫" value="cartoon" />
      <el-option label="学习" value="study" />
    </el-select>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="addVideoConfirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";

const { proxy } = getCurrentInstance();
const tableData = ref([]);
const DialogVisible = ref(false);
const inputTitle = ref("");
const inputVideoUrl = ref("");
const inputDescription = ref("");
const inputClassify = ref("");
const inputLandscape = ref("");
const inputPic = ref("");
const getVideo = async () => {
  const response = await proxy.$api.getVideo();
  tableData.value = response.data;
};

const addVideo = () => {
  DialogVisible.value = true;
};

const delVideo = async (id) => {
  try {
    await proxy.$api.delVideo({ id });
    // 重新获取视频列表以更新表格
    getVideo();
  } catch (error) {
    console.error("删除视频失败:", error);
  }
};

const cancel = () => {
  DialogVisible.value = false;
};

const addVideoConfirm = async () => {
  const newVideoData = {
    title: inputTitle.value,
    video_url: inputVideoUrl.value,
    description: inputDescription.value,
    pic: inputPic.value,
    landscape: inputLandscape.value,
    classify: inputClassify.value,
  };
  try {
    await proxy.$api.addVideo(newVideoData);
    DialogVisible.value = false;
    inputTitle.value = "";
    inputVideoUrl.value = "";
    inputDescription.value = "";
    inputClassify.value = "";
    inputLandscape.value = "";
    inputPic.value = "";
    getVideo(); // 重新获取视频列表
  } catch (error) {
    console.error("添加视频失败:", error);
  }
};

onMounted(() => {
  getVideo();
});
</script>

<style scoped lang="scss"></style>
