<template>
  <div class="pic">
    <el-image style="height: 400px; width: auto" :src="loginPic" />
    <el-form v-show="togglelogin">
      <div class="logincard">
        <div style="font-size: 20px; margin: 15px">登录</div>
        <div class="loginitems">
          <span style="margin-right: 8px; font-size: 16px">账号</span>
          <el-input
            v-model="input1"
            style="width: 200px"
            placeholder="请输入账号"
          ></el-input>
        </div>
        <div class="loginitems">
          <span style="margin-right: 8px; font-size: 16px">密码</span
          ><el-input
            v-model="input2"
            style="width: 200px"
            placeholder="请输入密码"
          ></el-input>
        </div>
        <div class="loginitem">
          <el-link
            @click="userregister"
            target="_blank"
            :underline="false"
            style="font-size: 10px; float: right"
            >注册</el-link
          >
        </div>
        <el-button @click="userlogining" class="btn">登录</el-button>
      </div>
    </el-form>
    <!-- 注册 -->
    <el-form v-show="toggleregister">
      <div class="logincard">
        <div style="font-size: 20px; margin: 15px">注册</div>
        <div class="loginitems">
          <span style="margin-right: 8px; font-size: 16px">账号</span>
          <el-input
            v-model="input1"
            style="width: 200px"
            placeholder="请输入账号"
          ></el-input>
        </div>
        <div class="loginitems">
          <span style="margin-right: 8px; font-size: 16px">密码</span
          ><el-input
            v-model="input2"
            style="width: 200px"
            placeholder="请输入密码"
          ></el-input>
        </div>

        <div class="loginitem">
          <el-link
            @click="loguser"
            target="_blank"
            :underline="false"
            style="font-size: 10px; float: right"
            >登录</el-link
          >
        </div>
        <el-button @click="reguser" class="btn">注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from "vue";
import loginPic from "../../../assets/logo/loginpic.png";
import router from "@/router";

const input1 = ref("");
const input2 = ref("");
const { proxy } = getCurrentInstance();

//登录用户
const userlogining = async () => {
  // 验证输入是否为空
  if (!input1.value || !input2.value) {
    alert("请输入账户和密码");
    return;
  }
  // 构建要发送的数据对象
  const inputData = {
    account: input1.value,
    password: input2.value,
  };
  const sendData = {
    topic: "登录通知",
    content: "您已成功登录本系统",
    date: new Date(),
  };
  try {
    const res = await proxy.$api.loginUsers(inputData);
    // 检查响应是否成功
    if (res) {
      await proxy.$api.sendMsg(sendData);
      router.push("/choice");
    } else {
      console.error("账号或密码错误");
    }
  } catch (error) {
    // 捕捉并处理错误
    console.error(error);
  }
};
const togglelogin = ref(true);
const toggleregister = ref(false);
//切换成注册
const userregister = () => {
  togglelogin.value = false;
  toggleregister.value = true;
};

//切换成登录
const loguser = () => {
  togglelogin.value = true;
  toggleregister.value = false;
};
//注册用户
const reguser = async () => {
  // 验证输入是否为空
  if (!input1.value || !input2.value) {
    alert("请输入账户和密码");
    return;
  }
  // 构建要发送的数据对象
  const userData = {
    account: input1.value,
    password: input2.value,
  };
  try {
    // 调用后端 API 注册用户
    const res = await proxy.$api.registerUsers(userData);
    // 检查响应是否成功
    if (res) {
      console.log("创建用户成功", res);

      router.push("/choice");
    } else {
      console.error("注册失败");
    }
  } catch (error) {
    // 捕捉并处理错误
    console.error(error);
  }
};
</script>
<style scoped>
.pic {
  margin: 80px;
  display: flex;
  justify-content: space-around;
}
.loginitem {
  margin: 10px 20px;
}
.loginitems {
  margin: 20px;
}
.btn {
  width: 240px;
  margin: 10px 20px;
  border-radius: 10px;
  background-color: blue;
  color: white;
}
.logincard {
  margin: 100px;
}
</style>
