import request from "./request"; // 引入 axios 实例

export default {
  // 注册用户
  registerUsers(userdata) {
    return request({
      url: "/api/register",
      method: "post",
      data: userdata,
    });
  },
  // 登录用户
  loginUsers(inputdata) {
    return request({
      url: "/api/login",
      method: "post",
      data: inputdata,
    });
  },
  //查询所有用户
  getUsers() {
    return request({
      url: "/my/user",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  // 查询登录用户
  getUser() {
    return request({
      url: "/my/userinfo",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },

  // 修改用户数据
  updateUser(uduserdata) {
    return request({
      url: "/my/userinfo",
      method: "post",
      data: uduserdata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  // 获取视频
  getVideo() {
    return request({
      url: "/v/videos",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  //添加视频
  addVideo(videodata) {
    return request({
      url: "/v/video",
      method: "post",
      data: videodata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  //删除视频
  delVideo(id) {
    return request({
      url: "/v/del",
      method: "post",
      data: id,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getVideoinfo(idData) {
    return request({
      url: "/v/videoinfo",
      method: "post",
      data: idData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getVideoclass(classData) {
    return request({
      url: "/v/videoclass",
      method: "post",
      data: classData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  reVideos() {
    return request({
      url: "/v/recommended",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  searchVideo(searchdata) {
    return request({
      url: "/v/search",
      method: "post",
      data: searchdata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getCollection() {
    return request({
      url: "/c/collection",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  addCollect(videodata) {
    return request({
      url: "/c/collect",
      method: "post",
      data: videodata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  delCollect(videodata) {
    return request({
      url: "/c/delcollect",
      method: "post",
      data: videodata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getSubscription() {
    return request({
      url: "/s/sub",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  addSubscription(videodata) {
    return request({
      url: "/s/addsub",
      method: "post",
      data: videodata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  delSubscription(videodata) {
    return request({
      url: "/s/delsub",
      method: "post",
      data: videodata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getHistory() {
    return request({
      url: "/h/htinfo",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  addHistory(historydata) {
    return request({
      url: "/h/history",
      method: "post",
      data: historydata,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  sendMsg(sendData) {
    return request({
      url: "/n/sendmsg",
      method: "post",
      data: sendData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getNews() {
    return request({
      url: "/n/receive",
      method: "get",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  getComments(sendData) {
    return request({
      url: "/cm/cinfo",
      method: "post",
      data: sendData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
  sendComment(sendData) {
    return request({
      url: "/cm/comments",
      method: "post",
      data: sendData,
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  },
};
