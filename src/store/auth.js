import {defineStore} from "pinia";
import Cookies from 'js-cookie';
import axiosClient from "@/axios";
import router from "@/router";

export const useAuthStore = defineStore('auth',{
    state: ()=>{
        return {
            user: {},
            token: Cookies.get('token') ?? null,
            isLoading: false,
        }
    },
    getters:{

    },
    actions:{
        async register(state) {
            try {
                const { data } = await axiosClient.post("auth/register", state);
                this.loadData(data);
                await this.fetchUser()
                await router.push({name: 'dashboard'});
            } catch (error) {}
        },
        async login(user) {
            try {
                const { data } = await axiosClient.post("auth/login", user);
                this.loadData(data);
                await this.fetchUser()
                await router.push({name: 'dashboard'});
            } catch (error) {}
        },
        loadData(data) {
            this.user  = data.user;
            this.token = data.token;
            Cookies.set("token", data.token, {
                expires: new Date(
                    new Date().setDate(
                        new Date().getDate() + (data.remember ? 365 : 1),
                    ),
                ),
            });
        },
        async logout() {
            try {
                const response = await axiosClient.post("auth/logout")
                if (response.status === 200) {
                    Cookies.remove("token")
                    this.token = null
                    this.user = {}
                    await router.push({name: 'login'});
                }
            } catch (error) {}
        },
        async fetchUser() {
            if (this.token) {
                try {
                    const response = await axiosClient.get("user");
                    this.user = response.data.data;
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    this.user = null;
                }
            }
        }
    }
})