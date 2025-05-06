// @/router/routes/index.ts

import auth from "@/middleware/auth";
import guest from "@/middleware/guest";
import verified from "@/middleware/verified";

const guestRoutes = {
  path: "/",
  name: "Guest",
  component: () => import("@/views/Guest/comming-soon.vue"),
};

const authRoutes = {
  path: "/auth",
  name: "AuthLayout",
  component: () => import("@/views/Auth/Layout.vue"),
  beforeEnter: guest,
  children: [
    {
      path: "login",
      name: "login",
      component: () => import("@/views/Auth/Login.vue"),
    },
    {
      path: "callback",
      name: "callback",
      component: () => import("@/views/Auth/EmailVerify.vue"),
    },
  ],
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "DashboardLayout",
  component: () => import("@/layouts/AuthenticateLayout.vue"),
  beforeEnter: auth,
  meta: {auth: true},
  redirect: { name: "dashboard" },
  children: [
    {
      path: "",
      name: "dashboard",
      meta: { can: "view dashboard" },
      component: () => import("@/views/Dashboard/Index.vue"),
    },
    {
      path: "employees",
      name: "employees",
      meta: { can: "view users" },
      component: () => import("@/views/Employees/Index.vue"),
    },
    {
      path: "clients",
      name: "clients",
      meta: { can: "view users" },
      component: () => import("@/views/Clients/Index.vue"),
    },
    {
      path: "roles",
      name: "roles",
      meta: { can: "view roles" },
      component: () => import("@/views/Roles/Index.vue"),
    },
    {
      path: "projects",
      name: "projects",
      meta: { can: "view projects" },
      component: () => import("@/views/Projects/Index.vue"),
    },
    {
      path: "tasks",
      name: "tasks",
      meta: { can: "view tasks" },
      component: () => import("@/views/Tasks/Index.vue"),
    },
    {
      path: "leaves",
      name: "leaves",
      meta: { can: "view leaves" },
      component: () => import("@/views/Leaves/Index.vue"),
    },
    {
      path: "events",
      name: "events",
      component: () => import("@/views/Events/Index.vue"),
    },
    {
      path: "profile",
      name: "profile",
      component: () => import("@/views/Profile/Index.vue"),
    },
    {
      path: "chat",
      name: "chat",
      component: () => import("@/views/Chat/Index.vue"),
    },
    {
      path: "todo",
      name: "todo",
      component: () => import("@/views/Todo/Index.vue"),
    },
    {
      path: "packages",
      name: "packages",
      meta: { can: "manage packages" },
      component: () => import("@/views/Packages/Index.vue"),
    },
    {
      path: "activities",
      name: "activities",
      meta: { can: "manage activities" },
      component: () => import("@/views/Activities/Index.vue"),
    },
    {
      path: "faq",
      name: "faq",
      meta: { can: "manage faq" },
      component: () => import("@/views/Faq/Index.vue"),
    },
    {
      path: "settings",
      name: "settings",
      meta: { can: "manage settings" },
      component: () => import("@/views/Settings/Index.vue"),
    },
  ],
};

const staticRoutes = [
  {
    path: '/complete-profile',
    name: 'complete-profile',
    meta: {auth: true},
    component: () => import('@/views/auth/CompleteProfile.vue'),
  },
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("@/views/Errors/403.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/Errors/404.vue"),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test.vue'),
  },
];

const routes = [
  authRoutes,
  dashboardRoutes,
  guestRoutes,
  ...staticRoutes,
];

export default routes;