import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import router from "@/router";
import { useToast } from "vue-toastification";
import {useAuthStore} from "@/store/auth";

const toast = useToast();

export const useTeamStore = defineStore('teams', {
    state: () => ({
        teams: [],
        teams_members: [],
        isLoading: false,
    }),
    actions: {
        async add() {},
        async edit() {},
        async delete(id) {},
        async getTeams(){
            const auth = useAuthStore();
            const userId = auth.user?.id;
            const { data, err } = await supabase
                .from('companies')
                .select(`
                        id,
                        name,
                        teams (
                          id,
                          name,
                          user:profiles(id, first_name, last_name),
                          team_members (
                            id,
                            user:profiles (
                              id,
                              first_name,
                              last_name
                            )
                          )
                        )
                      `)
                .eq('owner_id', userId)
                .single()

            // console.log(data)
        }
    },
})