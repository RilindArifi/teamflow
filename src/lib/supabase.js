// composables/useAuth.js
import { ref } from 'vue';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseRoleKey = import.meta.env.VITE_SUPABASE_ROLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseRoleKey, {
    realtime: {
        params: { eventsPerSecond: 10 },
    },
});

const user = ref(null);
const session = ref(null);
const loading = ref(false);
const error = ref(null);

class AuthenticationError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'AuthenticationError';
        this.status = status;
    }
}

export function useSupabase() {
    const signInWithOtp = async (email, url) => {
        loading.value = true;
        error.value = null;
        try {
            const { error: err } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: url,
                },
            });
            if (err) throw new AuthenticationError(err.message, err.status);
        } catch (err) {
            error.value = err instanceof AuthenticationError
                ? err
                : new AuthenticationError('Failed to send magic link');
        } finally {
            loading.value = false;
        }
    };

    const verifyOtp = async (email, token) => {
        loading.value = true;
        error.value = null;
        try {
            const { data, error: err } = await supabase.auth.verifyOtp({
                email,
                token,
                type: 'email',
            });
            if (err) throw new AuthenticationError(err.message, err.status);
            if (!data.user) throw new AuthenticationError('No user found');
            user.value = data.user;
            return data.user;
        } catch (err) {
            error.value = err instanceof AuthenticationError
                ? err
                : new AuthenticationError('Failed to verify OTP');
        } finally {
            loading.value = false;
        }
    };

    const signInWithProvider = async (provider) => {
        error.value = null;
        try {
            const { data, error: err } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                },
            });
            if (err) throw new AuthenticationError(err.message, err.status);
            return data;
        } catch (err) {
            error.value = new AuthenticationError(`Failed to sign in with ${provider}`);
        }
    };

    const signOut = async () => {
        loading.value = true;
        error.value = null;
        try {
            const { error: err } = await supabase.auth.signOut();
            if (err) throw new AuthenticationError(err.message, err.status);
            user.value = null;
            session.value = null;
        } catch (err) {
            error.value = err instanceof AuthenticationError
                ? err
                : new AuthenticationError('Failed to sign out');
        } finally {
            loading.value = false;
        }
    };

    const getSession = async () => {
        try {
            const { data, error: err } = await supabase.auth.getSession();
            if (err) throw new AuthenticationError(err.message, err.status);
            session.value = data.session;
            return data.session;
        } catch (err) {
            throw new AuthenticationError('Failed to get session');
        }
    };

    const getUser = async () => {
        try {
            const { data, error: err } = await supabase.auth.getUser();
            if (err) throw new AuthenticationError(err.message, err.status);
            user.value = data.user;
            return data.user;
        } catch (err) {
            throw new AuthenticationError('Failed to get user');
        }
    };

    const getProfile = async () => {
        try {
            const currentUser = await getUser();
            if (!currentUser) return null;

            const { data, error: err } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', currentUser.id)
                .single();

            if (err) throw new AuthenticationError(err.message);
            return data;
        } catch (err) {
            throw new AuthenticationError('Failed to get profile');
        }
    };

    return {
        user,
        session,
        loading,
        error,
        supabase,
        signInWithOtp,
        verifyOtp,
        signInWithProvider,
        signOut,
        getSession,
        getUser,
        getProfile,
    };
}