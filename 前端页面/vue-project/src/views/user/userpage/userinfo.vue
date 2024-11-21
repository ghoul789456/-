<template>
  <el-form>
    <p style="font-size: 30px; margin: 30px 0">用户信息</p>
    <div class="box">
      <div class="lbox">
        <el-form-item style="margin: 30px">
          <p style="width: 50px; font-size: 18px">昵称</p>
          <el-input
            style="width: 450px"
            v-model="input1"
            :placeholder="placeholder1"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin: 30px">
          <p style="width: 50px; font-size: 18px">id</p>
          <el-input
            style="width: 450px"
            v-model="input2"
            disabled
            :placeholder="placeholder2"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin: 30px">
          <p style="width: 50px; font-size: 18px">账号</p>
          <el-input
            style="width: 450px"
            v-model="input3"
            disabled
            :placeholder="placeholder3"
            class="el-input"
          ></el-input>
        </el-form-item>
        <el-button class="elbtn" @click="updateUser">保存</el-button>
      </div>
      <div class="rbox">
        <el-avatar
          :size="150"
          :src="picUrl"
          @click="openFilePicker"
        ></el-avatar>
        <input
          type="file"
          ref="fileInput"
          accept="image/*"
          style="display: none"
          @change="handleFileChange"
        />
      </div>
    </div>
  </el-form>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed } from "vue";
import avatarUrl from "@/assets/logo/R.jpg";
const { proxy } = getCurrentInstance();
const user = ref({});
const input1 = ref("");
const fileInput = ref(null);
const picUrl = ref("");
// 计算属性用于显示占位符
const placeholder1 = computed(() => user.value.nickname || "请输入昵称");
const placeholder2 = ref("");
const placeholder3 = ref("");
const getUser = async () => {
  user.value = await proxy.$api.getUser();
  // 更新输入框值
  if (user.value.nickname) {
    placeholder1.value = user.value.nickname;
  } else {
    placeholder1.value = "";
  }
  picUrl.value = user.value.pic || avatarUrl;
  placeholder2.value = user.value.id;
  placeholder3.value = user.value.account;
};
//更换头像
const openFilePicker = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      picUrl.value = e.target.result; // 更新页面中图片的显示
      user.value.pic = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
const updateUser = async () => {
  // 验证输入是否为空
  if (!input1.value) {
    alert("不能为空");
    return;
  }
  console.log("New nickname:", input1.value);
  const inputData = {
    nickname: input1.value,
    pic: user.value.pic,
  };

  try {
    const res = await proxy.$api.updateUser(inputData);
    history.go(0);
    console.log(res);

    // 检查响应是否成功
  } catch (error) {
    // 捕捉并处理错误
    console.error(error);
  }
};

onMounted(() => {
  getUser();
});
</script>

<style scoped>
.box {
  display: flex;
}
.rbox {
  width: 50%;
  text-align: center;
}

:deep(.el-input__wrapper) {
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
  height: 40px;
  width: 450px;
}

.elbtn {
  background-color: white;
  border: 1px solid black;
  color: black;
  margin: 30px;
}
</style>
