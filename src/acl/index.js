import { useAuthStore } from "@/store/auth";
import {SUPERADMIN} from "@/enums/roles";

export function hasRole(name) {
    const { user } = useAuthStore();
    if (user?.roles === SUPERADMIN) return true;
    return user.roles.includes(name);
}

export function can(permission) {
    const { user } = useAuthStore();
    if (user?.roles === SUPERADMIN) return true;
    return user.permissions.some(p => p === permission);
}

export async function checkPermission(to, from, next, permissions) {
    const store = useAuthStore();
    const success = await store.fetchUser();

    if (success && store.session) {
        const user = store.user;

        if (user?.roles === SUPERADMIN) {
            return next();
        }

        if (permissions && user?.roles) {
            const hasPermission = permissions.split(',').some(permission =>
                user.permissions.includes(permission)
            );

            if (!hasPermission) {
                return next({ name: "unauthorized" });
            }
        }

        return next();
    }

    return next({ name: "login" });
}