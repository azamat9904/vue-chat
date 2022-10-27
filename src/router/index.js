import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    redirect: "/auth/sign-in",
    children: [
      {
        path: "sign-in",
        name: "SignIn",
      },
      {
        path: "sign-up",
        name: "SignUp",
        component: () => import("@/views/SignUp"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
