import { useAuthStore } from "@/store/auth";

export function hasRole(name) {
    const { user } = useAuthStore();
    return user?.role?.includes(name);
}

export function can(permission) {
    const { user } = useAuthStore();
    return user?.permissions?.some(p => p.name === permission);
}

export async function checkPermission(to, from, next, permissions) {
    const store = useAuthStore();
    await store.fetchUser();

    if (store.token) {
        const userPermissions = store.user.permissions?.map(p => p.name) || [];

        const hasPermission = permissions.split(',').some(permission =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return next({ name: 'unauthorized' });
        }

        return next();
    }

    return next({ name: 'login' });
}