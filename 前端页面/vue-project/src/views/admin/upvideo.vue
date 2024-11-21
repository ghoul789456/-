<template>
  <div class="video-upload" label-width="auto">
    <el-form style="max-width: 600px">
      <el-form-item style="margin: 40px 20px" label="视频标题：">
        <el-input v-model="vt" placeholder="请输入视频标题" />
      </el-form-item>
      <el-form-item style="margin: 40px 20px" label="视频地址：">
        <el-input v-model="vurl" placeholder="请输入视频地址" />
      </el-form-item>
      <el-form-item style="margin: 40px 20px" label="视频展示图：">
        <el-input v-model="vpic" placeholder="请输入视频展示图" />
      </el-form-item>
      <el-form-item style="margin: 40px 20px" label="视频横向图：">
        <el-input v-model="hpic" placeholder="请输入视频横向图" />
      </el-form-item>
      <el-form-item style="margin: 40px 20px" label="视频简介：">
        <el-input v-model="des" type="textarea" placeholder="请输入视频简介" />
      </el-form-item>
      <el-form-item style="margin: 40px 20px" label="视频类别：">
        <el-select v-model="cls" placeholder="请选择类型">
          <el-option label="电视剧" value="tv" />
          <el-option label="电影" value="movie" />
          <el-option label="动漫" value="cartoon" />
          <el-option label="学习" value="study" />
        </el-select>
      </el-form-item>
      <el-button style="margin: 10px 20px" type="primary" @click="addvideo"
        >确定</el-button
      >
    </el-form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const vt = ref("");
const vurl = ref("");
const vpic = ref("");
const hpic = ref("");
const des = ref("");
const cls = ref("");
const addvideo = async () => {
  const videodata = {
    title: vt.value,
    video_url: vurl.value,
    pic: vpic.value,
    description: des.value,
    classify: cls.value,
    landscape: hpic.value,
  };
  const response = await proxy.$api.addVideo(videodata);
  if (response) {
    vt.value = "";
    vurl.value = "";
    vpic.value = "";
    hpic.value = "";
    cls.value = "";
    des.value = "";
  }
};
</script>

<style scoped>
.video-upload {
  width: 700px;
  margin: 20px 60px;
}
</style>
