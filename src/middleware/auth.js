import {useAuthStore} from "@/store/auth";

export default async (to, from, next) => {
    const store = useAuthStore();

    if (!store.session) {
        return next({name: 'login'});
    }else if(!store.user?.roles){
        return next({name: 'complete-profile'});
    }
    return next();
}
