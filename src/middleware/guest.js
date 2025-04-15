import {useAuthStore} from "@/store/auth";

export default async (to, from, next) => {
    const store = useAuthStore();

    if (store.token) {
        await store.fetchUser();
        next({name: 'dashboard'});
    }
    next();
}
