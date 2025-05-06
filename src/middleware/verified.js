import { useAuthStore } from "@/store/auth";

export default async (to, from, next) => {
    const store = useAuthStore();

    if (!store.session) return next({ name: "login" });

    if (!store.user) await store.fetchUser();

    const isVerified = !!store.user?.email_verified_at;
    const isOnVerifyPage = to.name === "email-verify";

    if (isVerified && isOnVerifyPage) return next({ name: "dashboard" });
    if (!isVerified && !isOnVerifyPage) return next({ name: "email-verify" });

    next();
};