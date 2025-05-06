import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import router from "@/router";
import { useToast } from "vue-toastification";
import {useAuthStore} from "@/store/auth";
import { getSafePagination } from '@/utils';
import {OWNER, SUPERADMIN} from "@/enums/roles";

const toast = useToast();

export const useRoleStore = defineStore('roles', {
    state: () => ({
        data: [],
        isLoading: false,
        total: 0,
    }),
    actions: {
        async add() {},
        async edit() {},
        async delete(id) {},
        async getRoles(state) {
            this.isLoading = true;
            try {
                const { start, end } = getSafePagination(state.current, state.perPage, this.total);
                const auth = useAuthStore();

                const { company, roles, id } = auth.user;

                let query = supabase
                    .from('roles')
                    .select(`
                        id,
                        name,
                        company:companies(name)
                      `, { count: 'exact' })
                    .neq('name', roles)
                    .range(start, end);

                switch (roles) {
                    case OWNER:
                        query = query.eq('company_id', company.id);
                        break;
                }

                const { data, error, count } = await query;

                if (error) {
                    toast.error(error.message);
                } else {
                    this.data.splice(0, this.data.length, ...(data || []));
                    this.total = count ?? 0;
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                this.isLoading = false;
            }
        }
    },
})