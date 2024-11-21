<template>
  <div class="header">
    <div class="left">
      <span class="logo">
        <img src="../assets/logo/OIP-C.jpg" @click="bakemain" />
      </span>
    </div>
    <div class="input-div">
      <el-input
        v-model="input"
        class="input-class"
        placeholder="Please Input"
        @click="search"
      >
        <template #append>
          <span style="cursor: pointer">
            <el-button data="results" @click="govideo(results[0].id)">
              <el-icon><Search /></el-icon>搜索
            </el-button>
          </span>
        </template>
      </el-input>
      <div v-if="results.length" class="search-results">
        <ul>
          <li
            v-for="(item, index) in results"
            :key="index"
            @click="govideo(item.id)"
            style="font-size: 13px"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>

    <div class="right">
      <el-dropdown>
        <span class="avatar"
          ><el-avatar @click="changepic" :size="40" :src="picUrl" /></span
        ><template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="userpage">个人中心</el-dropdown-item>
            <el-dropdown-item v-if="isAd" @click="upvideo"
              >视频管理</el-dropdown-item
            >
            <el-dropdown-item v-if="isAd" @click="upuser"
              >用户管理</el-dropdown-item
            >
            <el-dropdown-item v-if="isAd" @click="send"
              >发送通知</el-dropdown-item
            >
            <el-dropdown-item @click="newspage">我的消息</el-dropdown-item>
            <el-dropdown-item @click="dialogVisible = true"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <div class="quit">
    <el-dialog v-model="dialogVisible" width="300">
      <div class="tips">您确定要退出吗？</div>
      <template #footer>
        <div class="quititem">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="nextpage">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import avatarUrl from "../assets/logo/R.jpg";
import { ref, getCurrentInstance, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const { proxy } = getCurrentInstance();
const router = useRouter();
const input = ref("");

const user = ref({});
const results = ref([]);
const videos = ref([]);
const video = ref([]);
const isAd = ref("");
const dialogVisible = ref(false);
let searchTimeout = null; // 用于延时搜索的计时器

const bakemain = () => {
  router.push("/choice");
};
const userpage = () => {
  router.push("/userinfo");
};
const newspage = () => {
  router.push("/news");
};
const upvideo = () => {
  router.push("/vmanage");
};
const upuser = () => {
  router.push("/umanage");
};
const send = () => {
  router.push("/sendmsg");
};
const nextpage = () => {
  router.push("/register");
  localStorage.removeItem("token"); // 清除存储的 token
  dialogVisible.value = false;
};
const getUser = async () => {
  user.value = await proxy.$api.getUser();
  isAd.value = user.value.isAdmin;
};

// 默认头像
const picUrl = computed(() => {
  return user.value.pic ? user.value.pic : avatarUrl;
});

const search = async () => {
  if (input.value === "") {
    results.value = []; // 清空结果
    return; // 提前返回，不执行后续搜索逻辑
  }
  try {
    results.value = []; // 每次搜索前清空旧的结果
    const response = await proxy.$api.getVideo();
    videos.value = response.data;
    if (videos.value.length > 0) {
      const seenTitles = new Map();
      video.value = videos.value.reduce((unique, item) => {
        if (!seenTitles.has(item.title)) {
          seenTitles.set(item.title, true);
          unique.push(item);
        }
        return unique;
      }, []);

      if (video.value.length === 0) {
        console.log("没有符合分类的影片");
        results.value = []; // 清空结果
      } else {
        results.value = video.value.filter((v) =>
          v.title.includes(input.value)
        ); // 根据输入值匹配标题
        console.log("result", results.value);
      }
    } else {
      console.log("没有视频数据");
      results.value = []; // 清空结果
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    results.value = []; // 遇到错误时清空结果
  }
};

// 监听输入框变化，输入后5秒自动搜索
watch(input, () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout); // 如果用户继续输入，清除之前的计时器
  }
  searchTimeout = setTimeout(() => {
    search(); // 停止输入1秒后自动触发搜索
  }, 1000); // 1秒延迟
});
watch(
  () => route.query.q,
  (newQuery) => {
    if (newQuery) {
      input.value = decodeURIComponent(newQuery); // 更新输入框的值
      search();
      location.reload();
    }
  }
);
//点击搜索出的标题，跳转到对应页面
const govideo = (id) => {
  const query = encodeURIComponent(input.value);
  router.push({ path: "/search", query: { q: query } });
};

onMounted(() => {
  getUser();
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  position: fixed;
  z-index: 1;
  background-color: #fff;
  width: 100%;
  left: 0;
  right: 0;
}

.logo img {
  width: auto;
  height: 40px;
  margin-left: 20px;
}
.avatar {
  margin: 0 20px;
}
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.input-div {
  width: 500px;
  border-radius: 95px;
  background-color: #fff;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.078);
}

/* 搜索input框 */
:deep(.el-input__wrapper) {
  background-color: transparent;
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
  height: 40px;
}
/* 搜索button按钮 */
:deep(.el-input-group__append) {
  background: rgb(0 234 245 / 48%);
  border-radius: 95px;
  border: 0;
  box-shadow: 0 0 0 0px;
  height: 40px;
}
.el-dropdown-link:focus {
  outline: none;
}

:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}
.quititem {
  display: flex;
  justify-content: space-around;
}
.tips {
  text-align: center;
  font-size: 15px;
  margin: 15px 0;
}
:deep(.el-dialog) {
  height: 150px;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  padding: 5px;
}
.search-results {
  position: absolute; /* 使搜索结果浮动 */
  background-color: white;
  margin: 0 10px;
  width: 420px;
  z-index: 1000; /* 确保它位于其他元素之上 */
  border: 1px solid #ffffff;
  max-height: 150px;
  overflow-y: auto;
}
</style>
