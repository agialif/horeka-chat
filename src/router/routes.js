const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login-page",
    component: () =>
      import(/* webpackChunkName: "Login" */ "src/pages/login-page.vue"),
  },
  {
    path: "/chat",
    name: "chat-page",
    component: () =>
      import(/* webpackChunkName: "Login" */ "src/layouts/main-layout.vue"),
    redirect: "/index-chat",
    children: [
      {
        path: "/index-chat",
        name: "index-chat",
        component: () =>
          import(/* webpackChunkName: "Tickets" */ "src/pages/index-page.vue"),
      },
      {
        path: "/view-chat",
        name: "view-chat",
        component: () =>
          import(/* webpackChunkName: "Tickets" */ "src/pages/chat-page.vue"),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages/error-page.vue"),
  },
];

export default routes;
