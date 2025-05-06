<template>
  <Dropdown classMenuItems=" w-[180px] top-[58px] ">
    <div class="flex items-center">
      <div class="flex-1 rtl:ml-[5px]">
        <vue-avatar :username="store.user.name" :img-src="store.user.avatar" :size="35" background-color="#8ad1a5"></vue-avatar>
      </div>
      <div
        class="text-start ml-2 flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap"
      >
        <span class="overflow-hidden text-ellipsis w-[85px] block" >
          <span>{{ store.user.name }}</span>
          <br>
          <p class="text-xs text-green-600 font-bold">{{store.user.roles}}</p>
        </span>
        <span class="text-base inline-block rtl:mr-[3px]"
          ><Icon icon="heroicons-outline:chevron-down"></Icon
        ></span>
      </div>
    </div>
    <template #menus>
      <MenuItem v-slot="{ active }" v-for="(item, i) in ProfileMenu" :key="i">
        <div
          type="button"
          :class="`${
            active
              ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-900 dark:text-slate-300'
              : 'text-slate-600 dark:text-slate-300'
          } `"
          class="inline-flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-2 first:rounded-t last:rounded-b font-normal cursor-pointer"
          @click="item.link()"
        >
          <div class="flex-none text-lg">
            <Icon :icon="item.icon" />
          </div>
          <div class="flex-1 text-sm">
            {{ item.label }}
          </div>
        </div>
      </MenuItem>
    </template>
  </Dropdown>
</template>
<script setup>
import VueAvatar from "@webzlodimir/vue-avatar";
import {computed, onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import { MenuItem } from "@headlessui/vue";
import Dropdown from "@/components/Dropdown";
import Icon from "@/components/Icon";
import profileImg from "@/assets/images/all-img/user.png";
import {useAuthStore} from "@/store/auth";
import {useTeamStore} from "@/store/teams";

const router = useRouter();
const profileImage = profileImg;

const store = useAuthStore()
const teamStore = useTeamStore()

onMounted(() => {
  teamStore.getTeams()
})

const ProfileMenu = ref([
  {
    label: "Profile",
    icon: "heroicons-outline:user",
    link: () => router.push({name: 'profile'}),
  },
  {
    label: "Chat",
    icon: "heroicons-outline:chat",
    link: () => router.push("chat"),
  },
  {
    label: "Email",
    icon: "heroicons-outline:mail",
    link: () => router.push("email"),
  },
  {
    label: "Todo",
    icon: "heroicons-outline:clipboard-check",
    link: () => router.push("todo"),
  },
  {
    label: "Settings",
    icon: "heroicons-outline:cog",
    link: () => router.push("settings"),
  },
  {
    label: "Price",
    icon: "heroicons-outline:credit-card",
    link: () => router.push("pricing"),
  },
  {
    label: "Faq",
    icon: "heroicons-outline:information-circle",
    link: () => router.push("faq"),
  },
  {
    label: "Logout",
    icon: "heroicons-outline:login",
    link: async () => {
      await store.signOut()
    },
  },
]);

</script>
<style lang=""></style>
