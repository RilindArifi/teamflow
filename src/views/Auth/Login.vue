<template>
      <div class="text-center 2xl:mb-10 mb-4">
        <h4 class="font-medium">Sign in</h4>
        <div class="text-slate-500 text-base">
          Sign in to your account to start using Dashcode
        </div>
      </div>
      <form @submit.prevent="onSubmit" class="space-y-4">
        <Textinput
            label="Email"
            type="email"
            placeholder="Type your email"
            name="emil"
            v-model="email"
            :error="emailError"
            classInput="h-[48px]"
        />
        <Textinput
            label="Password"
            type="password"
            placeholder="********"
            name="password"
            v-model="password"
            :error="passwordError"
            hasicon
            classInput="h-[48px]"
        />
        <div class="flex justify-between">
          <label class="cursor-pointer flex items-start">
            <input
                type="checkbox"
                class="hidden"
                @change="() => (remember = !remember)"
            />
            <span
                class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
                :class="
      remember
        ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
        : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
    "
            >
    <img
        src="@/assets/images/icon/ck-white.svg"
        alt=""
        class="h-[10px] w-[10px] block m-auto"
        v-if="remember"
    />
  </span>
            <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
            >Keep me signed in</span
            >
          </label>
          <router-link
              :to="{name: 'forgot-password'}"
              class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
          >Forgot Password?</router-link
          >
        </div>
        <Button :is-loading="store.isLoading" type="submit" text="Dark" btnClass=" btn-dark" class="btn btn-dark block w-full text-center">
          Sign in
        </Button>
      </form>
      <div
          class="relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
      >
        <div
            class="absolute inline-block bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm text-slate-500 font-normal"
        >
          Or continue with
        </div>
      </div>
      <div class="max-w-[242px] mx-auto mt-8 w-full">
        <Social />
      </div>
      <div
          class="md:max-w-[345px] mx-auto font-normal text-slate-500 dark:text-slate-400 mt-12 uppercase text-sm"
      >
        Don’t have an account? Sign up
        <router-link
            :to="{name: 'register'}"
            class="text-slate-900 dark:text-white font-medium hover:underline"
        >
          Sign up
        </router-link>
      </div>
</template>
<script setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import Textinput from "@/components/Textinput";
import {useAuthStore} from "@/store/auth";
import Button from "@/components/Button/index.vue";
import Social from "@/views/Auth/Components/Social.vue";

const
    store = useAuthStore(),

    schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),

    { handleSubmit } = useForm({
      validationSchema: schema,
      initialValues: {
        email: "",
        password: "",
        remember: false,
      },
    }),

    { value: email, errorMessage: emailError }       = useField("email"),
    { value: password, errorMessage: passwordError } = useField("password"),
    { value: remember, errorMessage: rememberError} = useField("remember"),

    onSubmit = handleSubmit((values) => {
      store.login(values)
    });
</script>
<style scoped lang="scss">

</style>