import auth from "@/middleware/auth";
import guest from "@/middleware/guest";
import verified from "@/middleware/verified";

const routes = [
  {
    path: "/auth",
    name: "LayoutAuth",
    beforeEnter: guest,
    component: () => import("@/views/Auth/Layout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("@/views/Auth/Login.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("@/views/Auth/Register.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("@/views/Auth/ForgotPassword.vue"),
      },
      {
        path: "reset-password",
        name: "reset-password",
        component: () => import("@/views/Auth/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Layout",
    redirect: {name: "dashboard"},
    beforeEnter: auth,
    component: () => import("@/Layout/AuthenticateLayout.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        meta: {can: 'view dashboard'},
        component: () => import("@/views/Dashboard/Index.vue"),
      },
      {
        path: "employee",
        name: "employee",
        meta: {can: 'view users'},
        component: () => import("@/views/Users/Index.vue"),
      },
      {
        path: "roles",
        name: "roles",
        meta: {can: 'view roles'},
        component: () => import("@/views/index.vue"),
      },
      {
        path: "projects",
        name: "projects",
        meta: {can: 'view projects'},
        component: () => import("@/views/Projects/index.vue"),
      },
      {
        path: "tasks",
        name: "tasks",
        meta: {can: 'view tasks'},
        component: () => import("@/views/Tasks/index.vue"),
      },
      {
        path: "leaves",
        name: "leaves",
        meta: {can: 'view leaves'},
        component: () => import("@/views/Leaves/index.vue"),
      },
      {
        path: "calendar",
        name: "calendar",
        meta: {can: 'view calendar'},
        component: () => import("@/views/Calendar/index.vue"),
      },
    ],
  },

  {
    path: "/check-user",
    name: "check-user",
    component: () => import("@/views/Auth/Components/CheckAuth.vue"),
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("@/views/Errors/403.vue"),
  },
  {
    path: "/email-verify",
    redirect: "email-verify",
    beforeEnter: verified,
    component: () => import("@/views/Auth/Layout.vue"),
    children: [
      {
        path: "",
        name: "email-verify",
        component: () => import("@/views/Auth/EmailVerify.vue"),
      }
    ]
  },
];

export default routes;
