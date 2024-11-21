<template>
  <div>
    <div class="playbox">
      <!-- <iframe
        :src="videoEmbedUrl"
        width="640"
        height="360"
        style="margin: 30px"
        allow="autoplay"
        frameborder="0"
        allowfullscreen
        @load="addht"
      ></iframe> -->
      <video
        :src="videoEmbedUrl"
        width="640"
        height="360"
        style="margin: 30px"
        controls
        autoplay
        @loadedmetadata="addht"
      ></video>
      <div style="margin-top: 30px">
        <div class="detail">
          <el-image
            :src="currentVideo.pic"
            style="width: 120px; height: 170px"
          ></el-image>
          <div>
            <p style="margin: 0 20px">{{ currentVideo.title }}</p>
            <p class="intro" :class="{ expanded: isExpanded }">
              简介：{{ currentVideo.description }}
            </p>
            <span @click="toggleExpand" style="font-size: 12px">{{
              isExpanded ? "收起" : "展开"
            }}</span>
          </div>
        </div>
        <el-divider />
        <div style="margin: 20px 20px 20px 0; display: flex">
          <div style="margin-right: 20px">
            <el-icon v-if="isCollected" :size="30" @click="delcollection">
              <StarFilled />
            </el-icon>
            <el-icon v-else :size="30" @click="cvideo">
              <Star />
            </el-icon>
          </div>
          <div>
            <el-icon v-if="isSub" :size="30" @click="delsub"
              ><SuccessFilled
            /></el-icon>
            <el-icon v-else :size="30" @click="addsub"
              ><CirclePlusFilled
            /></el-icon>
          </div>
        </div>
        <div class="sets">
          <el-button
            v-for="(episode, index) in videoEpisodes"
            :key="episode.id"
            @click="selectEpisode(episode)"
            class="set"
          >
            {{ index + 1 }}
          </el-button>
        </div>
      </div>
    </div>
  </div>
  <h3>评论</h3>
  <div style="display: flex; margin: 20px 0">
    <el-input v-model="input" placeholder="分享你的评论"></el-input>
    <el-button style="margin-left: 10px" @click="send">发布</el-button>
  </div>
  <div v-for="item in comments">
    <div class="cminfo">
      <el-image
        :src="item.pic"
        style="width: 50px; border-radius: 50%"
      ></el-image>
      <p class="sdname">{{ item.nickname }}</p>
      <p class="sdtime">{{ item.formattedDate }}</p>
    </div>
    <p style="margin: 10px 0">{{ item.content }}</p>
    <el-divider />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const route = useRoute();

const videoEpisodes = ref([]); // 存储所有集数
const currentVideo = ref({ title: "", description: "", pic: "" }); // 当前正在播放的视频
const videoEmbedUrl = ref(""); // 当前视频的播放URL
const videoId = route.params.id;
const input = ref("");
const comments = ref([]);
const user = ref([]);
const isCollected = ref(false);
const isSub = ref(false);
const collections = ref([]);
const subscription = ref([]);

// 控制简介的展开/收起
const isExpanded = ref(false);
// 切换展开/收起状态
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};
const getVideoinfo = async () => {
  const iddata = {
    id: videoId,
  };
  // 获取路由参数中的 ID
  try {
    const response = await proxy.$api.getVideoinfo(iddata);
    videoEpisodes.value = response.data;
    selectEpisode(videoEpisodes.value[0]);
  } catch (error) {
    console.error("Error fetching video:", error);
  }
};

// 选择特定的集数并播放
const selectEpisode = (episode) => {
  currentVideo.value = episode;
  videoEmbedUrl.value = episode.video_url; // 更新播放器 URL
};
//获取收藏信息
const getCollection = async () => {
  try {
    const response = await proxy.$api.getCollection();
    collections.value = response.data;
    // 检查收藏列表中是否有当前视频
    isCollected.value = collections.value.find(
      (item) => item.vid === Number(videoId)
    );
  } catch (error) {
    console.error("Error fetching collections:", error);
  }
};
const cvideo = async () => {
  try {
    const videodata = {
      vid: videoId,
      title: videoEpisodes.value[0].title,
      pic: videoEpisodes.value[0].pic,
    };
    // 调用接口进行收藏操作
    const res = await proxy.$api.addCollect(videodata);
    if (res) {
      isCollected.value = true;
      console.log("收藏成功，状态更新为已收藏");
    }
  } catch (error) {
    console.error("收藏失败:", error);
  }
};

const delcollection = async () => {
  try {
    const videodata = {
      vid: videoId,
    };

    const res = await proxy.$api.delCollect(videodata);
    // 取消收藏后，更新收藏状态
    if (res) {
      isCollected.value = false;
      console.log("取消收藏成功，状态更新为未收藏");
    }
  } catch (error) {
    console.error("取消收藏失败:", error);
  }
};

const getSubscription = async () => {
  try {
    const response = await proxy.$api.getSubscription();
    subscription.value = response.data;
    // 检查订阅列表中是否有当前视频
    isSub.value = subscription.value.find(
      (item) => item.vid === Number(videoId)
    );
  } catch (error) {
    console.error("Error fetching subscription:", error);
  }
};
const addsub = async () => {
  try {
    const videodata = {
      vid: videoId,
      title: videoEpisodes.value[0].title,
      pic: videoEpisodes.value[0].pic,
    };
    // 调用接口进行收藏操作
    const res = await proxy.$api.addSubscription(videodata);
    if (res) {
      isSub.value = true;
    }
  } catch (error) {
    console.error("订阅失败:", error);
  }
};

const delsub = async () => {
  try {
    const videodata = {
      vid: videoId,
    };

    const res = await proxy.$api.delSubscription(videodata);

    if (res) {
      isSub.value = false;
    }
  } catch (error) {
    console.error("取消订阅失败:", error);
  }
};

// 记录观看历史
const addht = async () => {
  try {
    const historydata = {
      vid: videoId,
      date: new Date().toISOString(),
    };

    const res = await proxy.$api.addHistory(historydata);
  } catch (error) {
    console.error("请求发生错误:", error);
  }
};

// 获取评论
const getComments = async () => {
  try {
    const senddata = {
      vid: videoId,
    };

    // 获取评论数据
    const res = await proxy.$api.getComments(senddata);

    // 检查 res.data 是否存在
    if (res.data && Array.isArray(res.data)) {
      // 格式化日期并排序
      comments.value = res.data
        .map((item) => {
          const date = new Date(item.date);

          // 检查是否为有效日期
          if (isNaN(date)) {
            console.warn(`Invalid date for comment ID: ${item.id}`);
            return { ...item, formattedDate: "Invalid Date" };
          }

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
            // 用空格替换逗号
          };
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // 根据日期排序
    } else {
      console.warn("No comments data found or invalid format.");
    }
  } catch (error) {
    console.error("请求发生错误:", error);
  }
};
const getUser = async () => {
  try {
    const userData = await proxy.$api.getUser();
    user.value = userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const send = async () => {
  console.log(" user.value.pic", user.value.pic);

  try {
    const senddata = {
      vid: videoId,
      content: input.value,
      date: new Date(),
      pic: user.value.pic,
    };
    console.log("senddata", senddata);

    const res = await proxy.$api.sendComment(senddata);
    if (res) {
      input.value = ""; // 清空输入框
      getComments(); // 重新获取评论
    }
  } catch (error) {
    console.error("请求发生错误:", error);
  }
};
onMounted(() => {
  getCollection();
  getSubscription();
  getVideoinfo();
  getComments();
  getUser();
});
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.playbox {
  display: flex;
}
.sets {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
.set {
  height: 40px;
  width: 40px;
  border: 1px solid rgb(247, 245, 245);
  margin: 10px 10px 10px 0;
  text-align: center;
  line-height: 40px;
  background-color: rgb(255, 251, 251);
  /* box-shadow: 1px 1px 10px 1px rgb(196, 194, 194); */
}
.intro {
  display: inline-block;
  width: 250px;
  margin: 0 0 0 20px;
  font-size: 12px;
  height: 30px; /* 限制高度为30px */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: normal;
  transition: height 0.3s ease; /* 添加过渡效果 */
}

.expanded {
  height: auto; /* 当展开时，移除高度限制 */
  overflow: visible; /* 展开时显示所有内容 */
}

.detail {
  display: flex;
  height: 200px;
}
.cminfo {
  display: flex;
}
.sdname {
  font-size: 18px;
  margin: 0 10px;
}
.sdtime {
  margin: 5px 0;
  font-size: 12px;
}
</style>
