import {useAuthStore} from "@/store/auth";

export default async (to, from, next) => {
    const store = useAuthStore();
    const success = await store.fetchUser();

    if (success && store.session) {
        return next({ name: 'dashboard' });
    }
    return next();
}
