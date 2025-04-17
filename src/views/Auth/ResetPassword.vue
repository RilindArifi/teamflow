<template>
    <div class="text-center 2xl:mb-10 mb-5">
      <h4 class="font-medium mb-4">Reset Your Password</h4>
      <div class="text-slate-500 dark:text-slate-400 text-base">
        Enter a new password for your account.
      </div>
    </div>

    <div
        class="font-normal text-base text-slate-500 dark:text-slate-400 text-center px-2 bg-slate-100 dark:bg-slate-600 rounded py-3 mb-4 mt-10"
    >
      Set a strong password and confirm it.
    </div>

    <form @submit.prevent="onSubmit" class="max-w-md w-full mx-auto space-y-4">
      <Textinput
          label="New Password"
          type="password"
          placeholder="********"
          v-model="password"
          hasicon
          :error="passwordError"
      />
      <Textinput
          label="Confirm Password"
          type="password"
          placeholder="********"
          hasicon
          v-model="password_confirmation"
          :error="confirmPasswordError"
      />
      <Textinput
          hidden
          placeholder=""
          v-model="token"
      />
      <Button :is-loading="isLoading" text="Dark" btnClass=" btn-dark" type="submit" class="w-full">Reset Password</Button>
    </form>

    <div
        class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-8 uppercase text-sm text-center"
    >
      <router-link
          :to="{ name: 'login' }"
          class="text-slate-900 dark:text-white font-medium hover:underline"
      >
        Go to Login
      </router-link>
    </div>
</template>

<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Textinput from "@/components/Textinput/index.vue";
import {useAuthStore} from "@/store/auth";
import {useRoute, useRouter} from "vue-router";
import Button from "@/components/Button/index.vue";
import {useToast} from "vue-toastification";
import axiosClient from "@/axios";
import {ref} from "vue";

const
    store = useAuthStore(),
    isLoading = ref(false),
    toast = useToast(),
    route = useRoute(),
    router = useRouter(),
    schema = yup.object({
      password: yup.string().required().min(8),
      password_confirmation: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords must match")
          .required(),
      token: yup.string().required(),
    }),
    { handleSubmit } = useForm({
      validationSchema: schema ,
      initialValues: {
        password: "",
        password_confirmation: "",
        token: route.query.token,
      },
    }),

    { value: password, errorMessage: passwordError } = useField("password"),
    { value: password_confirmation, errorMessage: confirmPasswordError } = useField("password_confirmation"),
    { value: token} = useField("token"),

    onSubmit = handleSubmit(async (values) => {
      isLoading.value = true;
      try {
          await store.resetPassword(values)
          toast.success('Password has been reset successfully.')
          await router.push({name: "login"});
      }catch (error) {}
      finally { isLoading.value = false }
    });
</script>