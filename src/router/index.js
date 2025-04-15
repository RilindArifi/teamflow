import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import routes from "./route";
import {checkPermission} from "@/acl";

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  base: import.meta.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.can) {
    await checkPermission(to, from, next, to.meta.can);
  } else {
    next();
  }

  // Title update
  const titleText = to.name;
  const words = titleText?.split(" ") || [];
  const capitalized = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  document.title = `Teamflow - ${capitalized}`;

  NProgress.start();
});

router.afterEach(() => {
  NProgress.done()
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
