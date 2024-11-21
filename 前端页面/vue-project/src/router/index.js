import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/main.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          redirect: "/",
          component: () => import("../views/home.vue"),
        },

        {
          path: "/tv",
          name: "tv",
          component: () => import("../views/channel/tv.vue"),
        },
        {
          path: "/movie",
          name: "movie",
          component: () => import("../views/channel/movie.vue"),
        },
        {
          path: "/study",
          name: "study",
          component: () => import("../views/channel/study.vue"),
        },
        {
          path: "/cartoon",
          name: "cartoon",
          component: () => import("../views/channel/cartoon.vue"),
        },
        {
          path: "/choice",
          name: "choice",

          component: () => import("../views/channel/choice.vue"),
        },
        {
          path: "/player/:id",
          name: "player",
          component: () => import("../views/channel/player.vue"),
          props: true,
        },
        {
          path: "/search",
          name: "search",
          component: () => import("../views/channel/search.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/user/userpage/register.vue"),
    },
    {
      path: "/news",
      name: "news",
      component: () => import("../views/user/userpage/new.vue"),
    },
    {
      path: "/user",
      component: () => import("../views/user/users.vue"),
      children: [
        {
          path: "/collect",
          name: "collect",
          component: () => import("../views/user/userpage/collect.vue"),
        },
        {
          path: "/history",
          name: "history",
          component: () => import("../views/user/userpage/history.vue"),
        },
        {
          path: "/userinfo",
          name: "userinfo",
          component: () => import("../views/user/userpage/userinfo.vue"),
        },

        {
          path: "/subscription",
          name: "subscription",
          component: () => import("../views/user/userpage/subscription.vue"),
        },
      ],
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("../views/admin/manage.vue"),
    },
    {
      path: "/manage",
      name: "manage",
      component: () => import("../views/admin/manage.vue"),
      children: [
        {
          path: "/umanage",
          name: "umanage",
          component: () => import("../views/admin/user.vue"),
        },
        {
          path: "/vmanage",
          name: "vmanage",
          component: () => import("../views/admin/video.vue"),
        },
        {
          path: "/sendmsg",
          name: "sendmsg",
          component: () => import("../views/admin/sendmsg.vue"),
        },
      ],
    },
  ],
});

export default router;
