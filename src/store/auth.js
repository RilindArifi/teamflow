import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import router from "@/router";
import { useToast } from "vue-toastification";
import { MEMBER, OWNER} from "@/enums/roles";

const toast = useToast();

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        session: null,
        token: null,
        isLoading: false
    }),
    actions: {
        async signInWithOtp(email) {
            this.isLoading = true;
            try {
                const { data, error } = await supabase.auth.signInWithOtp({
                    email: email
                });

                if (error) {
                    toast.error(error.message);
                    return;
                }
                sessionStorage.setItem('email', email);

                toast.success('Please check your email for verification.');
                await router.push({ name: 'callback' });
            } catch (error) {
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        async verifyOtp(email, token) {
            this.isLoading = true;
            try {
                const { data, error } = await supabase.auth.verifyOtp({
                    email,
                    token,
                    type: 'email',
                });

                if (error) {
                    toast.error(error.message);
                }else{
                    sessionStorage.removeItem('email');
                    this.user = data.user;
                    await router.push({ name: 'dashboard' });
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        async signOut() {
            this.isLoading = true;
            try {
                const { error } = await supabase.auth.signOut();

                if (error) {
                    toast.error(error.message);
                    return;
                }

                await router.push({ name: 'login' });
                toast.success('Logged out successfully.');
            } catch (error) {
                console.error(error);
                toast.error('Logout failed.');
            } finally {
                this.isLoading = false;
            }
        },
        async completeProfile(state) {
            this.isLoading = true;

            try {
                const { error } = await supabase.rpc('complete_profile', {
                    user_id: this.user.id ?? this.session.user.id,
                    company_name: state.company_name,
                    p_first_name: state.first_name,
                    p_last_name: state.last_name,
                    permission_owner_ids: [
                        '548605b5-6d84-4cec-8b17-2bdcec921128',
                        '570dd080-9bd1-4632-b5ab-fa85ae69acb1',
                        'bb697173-3c32-4ff8-90f8-eaa662dfcdf5',
                        'f63b1f0d-d729-43c2-9ac4-95de4407da71',
                        '319bba13-f0aa-4602-aea1-bd07cdf9a756',
                        'e35c06c3-b904-4bd0-880d-0010718d6c83',
                        'f6bef231-3df8-44c2-8bc2-9290c95aaf95',
                        '498f9d88-649f-4d59-a913-d830db06cfb3',
                        '03c6f7b4-c95a-402a-b9ad-b9c68c328bc5',
                        '9b6071f2-466d-4d62-9b96-dfeb91a87dcc',
                        'c34aad05-6517-4946-9b59-8d19865f7ac8',
                        'a94be63d-0298-4b30-b5b7-8a21af6c7ba3',
                        '9edb7b31-a16c-4f81-bfd7-7e3b8d81d8a2',
                        'db011b6e-94a0-4e5d-b818-c1e673f685e1',
                        'bfec4d5e-22a6-4801-b1c2-16db98704da3',
                    ],
                    permission_member_ids: [
                        '03c6f7b4-c95a-402a-b9ad-b9c68c328bc5',
                        '9b6071f2-466d-4d62-9b96-dfeb91a87dcc',
                        'c34aad05-6517-4946-9b59-8d19865f7ac8',
                        'a94be63d-0298-4b30-b5b7-8a21af6c7ba3',
                        '9edb7b31-a16c-4f81-bfd7-7e3b8d81d8a2',
                        'db011b6e-94a0-4e5d-b818-c1e673f685e1',
                        'bfec4d5e-22a6-4801-b1c2-16db98704da3',
                    ],
                    owner_role_name: OWNER,
                    member_role_name: MEMBER
                });

                if (error) {
                    toast.error(error.message);
                }else{
                    await this.fetchUser()
                    toast.success("Profile completed successfully!");
                    await router.push({ name: 'dashboard' });
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        async completeProfileMember(state){
            this.isLoading = true;

            try {
            const { error } = await supabase.rpc('complete_profile_member', {
                user_id: this.user?.id ?? this.session.user.id,
                p_first_name: state.first_name,
                p_last_name: state.last_name,
            });

                if (error) {
                    toast.error(error.message);
                }else{
                    await this.fetchUser()
                    toast.success("Profile completed successfully!");
                    await router.push({ name: 'dashboard' });
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchUser() {
            try {
                const [user, session] = await Promise.all([
                    this.getSession(),
                    this.getProfile()
                ]);
                return true;
            } catch (err) {
                toast.error(err.message);
                this.user = null;
                return false;
            }
        },
        async getSession(){
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) toast.error(error.message);
                this.session = data.session;
                return data.session;
            } catch (error) {
                toast.error(error.message);
            }
        },
        async getProfile() {
            try {
                if(localStorage.getItem('sb-zybjwlpyemxxfivfbrxt-auth-token')) {
                    const {data, error: profileError} = await supabase
                        .from('v_user_profile_roles')
                        .select('*')
                        .maybeSingle();

                    if (profileError) {
                        toast.error(profileError.message);
                        return;
                    } else {
                        this.user = {
                            ...this.session.user,
                            id: data.user_id,
                            name: `${data.first_name} ${data.last_name}`.trim(),
                            company: data.company,
                            roles: data.role?.name,
                            permissions: data.role?.permissions?.map(p => `${p.action} ${p.resource}`) ?? []
                        }
                    }

                    return this.user;
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }
})